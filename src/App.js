import './App.css'
import {Component} from 'react'

import Header from './Header'
import TabItem from './TabItem'
import ListCard from './ListCard'
import LoaderCard from './LoaderCard'
import FailureCard from './FailureCard'

const apiStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

let updateData = []

class App extends Component {
  state = {
    list: [],
    status: apiStatus.loading,
    activeTabId: '',
    DishesList: [],
    cartItems: [],
    name: [],
  }

  componentDidMount() {
    this.getListData()
  }

  getUpdateData = data =>
    data.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      categoryDishes: each.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishImage: eachDish.dish_image,
        dishPrice: eachDish.dish_price,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishType: eachDish.dish_Type,
        dishAvailability: eachDish.dish_Availability,
        dishDescription: eachDish.dish_description,
        addOnCat: eachDish.addonCat,
      })),
    }))

  getListData = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      updateData = this.getUpdateData(data[0].table_menu_list)
      this.setState({
        status: apiStatus.success,
        list: updateData,
        name: data,
        activeTabId: updateData[0].menuCategoryId,
        DishesList: updateData[0].categoryDishes,
      })
    }
  }

  tabBtnClk = id => {
    const {list} = this.state
    const {categoryDishes} = list.find(each => each.menuCategoryId === id)
    this.setState({activeTabId: id, DishesList: categoryDishes})
  }

  increseCartCount = dish => {
    const {cartItems} = this.state
    const isAlreadyExist = cartItems.find(each => each.dishId === dish.dishId)
    if (!isAlreadyExist) {
      const newDish = {...dish, quantity: 1}
      this.setState(prev => ({cartItems: [...prev.cartItems, newDish]}))
    } else {
      this.setState(prev => ({
        cartItems: prev.cartItems.map(each => {
          if (each.dishId === dish.dishId) {
            return {...each, quantity: each.quantity + 1}
          }
          return {...each}
        }),
      }))
    }
  }

  decresecartCount = dish => {
    const {cartItems} = this.state
    const isAlreadyExist = cartItems.find(each => each.dishId === dish.dishId)
    if (isAlreadyExist) {
      this.setState(prev => ({
        cartItems: prev.cartItems
          .map(each => {
            if (each.dishId === dish.dishId) {
              return {...each, quantity: each.quantity - 1}
            }
            return {...each}
          })
          .filter(each => each.quantity > 0),
      }))
    }
  }

  renderSuccessView = () => {
    const {list, cartItems, name, activeTabId, DishesList} = this.state
    return (
      <>
        <Header cartItems={cartItems} nameInput={name} />
        <ul className="tab_container">
          {list.map(each => (
            <TabItem
              data={each}
              key={each.menuCategoryId}
              tabClick={this.tabBtnClk}
              isActive={activeTabId === each.menuCategoryId}
            />
          ))}
        </ul>
        <ul className="list_container">
          {DishesList.map(each => (
            <ListCard
              data={each}
              cartItems={cartItems}
              key={each.dishId}
              addCartCount={this.increseCartCount}
              removeCartCount={this.decresecartCount}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoaderView = () => <LoaderCard />

  renderFailureView = () => <FailureCard />

  renderFinalView = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.loading:
        return this.renderLoaderView()

      case apiStatus.failure:
        return this.renderFailureView()
    }
  }

  render() {
    
    return <div className="container">{this.renderFinalView()}</div>
  }
}

export default App
