import { useState } from "react";
import "./newProduct.css";

export default function NewProduct({ newProduct, productImg }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("images/beer.jpeg");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [purchasePrice, setPurchasePrice] = useState(0.0)
  const [sellingPrice, setSellingPrice] = useState(purchasePrice);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setselectedFile] = useState();

  //   submit handle
  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please a Product!");
      return;
    }
    newProduct({ name, img, quantity, category, sellingPrice, purchasePrice });
    setName("");
    setImg("images/beer.jpeg");
    setQuantity(0);
    setCategory("");
    setSellingPrice(purchasePrice);
    setPurchasePrice(0.0)
  };

  const options = [
    {
      label: "On stock",

      value: "On stock",
    },

    {
      label: "Out of stock",

      value: "Out of stock",
    },
  ];
  // image handle
  const imgUpload = async (event) => {
    setselectedFile(event.target.files[0]);

    const formData = new FormData();
    formData.append("imgFile", selectedFile); // file will be accessed by imgFile
    productImg(formData);

    setImg(await selectedFile.name);
    // save locally
    if (selectedFile.type !== "image/png") {
      setIsSelected(false);
    }

    setIsSelected(true);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={onSubmit}>
        {/* image upload */}
        <div className="addProductItem">
          <label htmlFor="image">Image</label>
          <input type="file" id="file" onChange={imgUpload} />
        </div>
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>

            <p>Filetype: {selectedFile.type}</p>

            <p>Size in bytes: {selectedFile.size}</p>

            {/* <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p> */}
          </div>
        ) : (
          <p>Select Product image</p>
        )}

        <div className="addProductItem">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="quantity">quantity</label>
          <input
            type="number"
            placeholder="quantity in ml"
            min={0}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="purchasePrice">purchasePrice</label>
          <input
            type="number"
            placeholder="ksh. 0.00"
            min={0.0}
            step={"0.01"}
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
            required
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="sellingPrice">sellingPrice</label>
          <input
            type="number"
            placeholder="ksh. 0.00"
            min={0.0}
            step={"0.01"}
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            required
          />
        </div>
        <div className="addProductItem">
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory({ category: e.target.value })}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <input
          type="submit"
          value={"Add product"}
          className="addProductButton"
        />
      </form>
    </div>
  );
}