import './App.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ListCard from './ListCard'

import Header from './Header'
import TabItem from './TabItem'
//import TabList from './TabList'

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
  }

  componentDidMount() {
    this.getListData()
  }

  getUpdateData = data =>
    data.map(each => ({
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      categoryDishes: each.category_dishes.map(each => ({
        dishId: each.dish_id,
        dishName: each.dish_name,
        dishImage: each.dish_image,
        dishPrice: each.dish_price,
        dishCurrency: each.dish_currency,
        dishCalories: each.dish_calories,
        dishType: each.dish_Type,
        dishAvailability: each.dish_Availability,
        dishDescription: each.dish_description,
        addOnCat: each.addonCat,
      })),
    }))

  getListData = async () => {
    const url = 'https://run.mocky.io/v3/2477b10c-ee18-4487-9962-1b3d073432c4'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    //console.log(data)

    if (response.ok) {
      updateData = this.getUpdateData(data[0].table_menu_list)
      this.setState({
        status: apiStatus.success,
        list: updateData,
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
          } else {
            return {...each}
          }
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
            } else {
              return {...each}
            }
          })
          .filter(each => each.quantity > 0),
      }))
    }
  }

  render() {
    const {activeTabId, list, DishesList, cartItems} = this.state
    return (
      <div className="container">
        <Header cartItems={cartItems} />
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
      </div>
    )
  }
}

export default App
