import './index.css'

const TabItem = props => {
  const {tabClick, data, isActive} = props
  const {menuCategory, menuCategoryId} = data
  const styles = isActive ? 'styles' : ''
  const BtnClk = () => {
    tabClick(menuCategoryId)
  }
  return (
    <li className="btn_1">
      <button type="button" className={`tab_item ${styles}`} onClick={BtnClk}>
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
