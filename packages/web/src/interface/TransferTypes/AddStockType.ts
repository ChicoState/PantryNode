// const { itemName, category_id, quantity, ExpiryDate, price, donorID } =

interface AddStockType {
  userType: string;
  itemName: string;
  category_id: string;
  quantity: string;
  ExpiryDate: Date;
  price: string;
  donorID: string;
}

export default AddStockType;
