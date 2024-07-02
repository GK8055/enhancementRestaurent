import './index.css'

const TabItem = props => {
  const {tabClick, data, isActive} = props
  const {menuCategory, menuCategoryId} = data
  const styles = isActive ? 'styles' : ''
  const BtnClk = () => {
    tabClick(menuCategoryId)
  }
  return (
    <li className={`tab_item ${styles}`} onClick={BtnClk}>
      {menuCategory}
    </li>
  )
}

export default TabItem
