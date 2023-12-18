import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./lam.css";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as WarehouseReceiptService from "../../services/warehouse/WarehouseService";

export function WarehouseCreate() {
  const [inputValues, setInputValues] = useState({});
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState("");

  const getAllProducts = async () => {
    const products = await WarehouseReceiptService.getAllProducts();
    let res = await WarehouseReceiptService.getCode();
    setCode(res);
    setProducts(products);
    console.log(res);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const initValue = {
    sizeDetailId: 0,
    inputQuantity: 0,
    inputPrice: 0,
    warehouseId: 0,
    productId: 0,
    sizeId: 0,
    receiptCode: code,
    receiptDate: new Date().toLocaleDateString(),
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setItems((prevItems) => [...prevItems, inputValues]);
    setInputValues({});
  };

  if (!products) return null;
  if (!code) return null;

  return (
      <>
        <div class="container  mt-3 p-5 form-control">
          <div class="d-flex justify-content-center">
            <div class="input-card form-control shadow-lg ">
              <h2 class="input-title">Nhập Kho</h2>
              <Formik
                  initialValues={initValue}
                  onSubmit={() => {
                    handleSubmit();
                  }}
                  validationSchema={Yup.object({
                    inputQuantity: Yup.number()
                        .typeError('Vui lòng chỉ nhập số')
                        .integer("Vui lòng nhập số nguyên dương")
                        .required("Vui lòng không để trống trường này")
                        .min(1, "Vui lòng nhập số lớn hơn 0")
                        .max(2000, "Vui lòng không nhập số lớn hơn 2000"),
                    inputPrice: Yup.number()
                        .required("Vui lòng không để trống trường này")
                        .min(1, "Vui lòng nhập số lớn hơn 0")
                        .max(1000000000, "Vui lòng không nhập số lớn hơn 10000000"),
                  })}
              >
                <Form class="input-form">
                  <div class="input-group">
                    <Field
                        placeholder=""
                        type="text"
                        name="receiptCode"
                        id="validationDefault01"
                        disabled
                        onChange={handleChange}
                    />
                    <label for="validationDefault01">Mã phiếu</label>
                  </div>
                  <div class="input-group">
                    <Field
                        placeholder=""
                        type="text"
                        name="receiptDate"
                        id="validationDefault01"
                        onChange={handleChange}
                        disabled
                    />
                    <label for="validationDefault01">Ngày nhập kho</label>
                  </div>
                  <div class="input-group">
                    <Field
                        name="productId"
                        list="datalistOptions"
                        id="exampleDataList"
                        placeholder=""
                        value={inputValues.productId}
                        onChange={handleChange}
                    />
                    <label for="exampleDataList">Tên sản phẩm</label>
                    <datalist id="datalistOptions">
                      {products.map((product) => (
                          <option key={product.id} value={product.productName}>

                          </option>
                      ))}
                    </datalist>
                    <ErrorMessage
                        name="productId"
                        component="span"
                        className="err-name"
                    ></ErrorMessage>
                  </div>
                  <div class="input-group">
                    <Field
                        placeholder=""
                        type="text"
                        name="sizeId"
                        id="validationDefault01"
                    />
                    <label for="validationDefault01">Size</label>
                  </div>
                  <div class="input-group">
                    <Field
                        placeholder=""
                        type="number"
                        name="inputQuantity"
                        id="validationDefault01"
                        value={inputValues.inputQuantity}
                        onChange={handleChange}
                    />
                    <label for="validationDefault01">Số lượng</label>
                    <ErrorMessage
                        name="inputQuantity"
                        component="span"
                        className="err-name"
                    ></ErrorMessage>
                  </div>
                  <div class="input-group">
                    <Field
                        placeholder=""
                        type="number"
                        name="inputPrice"
                        id="validationDefault01"
                        value={inputValues.inputPrice}
                        onChange={handleChange}
                    />
                    <label for="validationDefault01">Đơn giá</label>
                    <ErrorMessage
                        name="inputPrice"
                        component="span"
                        className="err-name"
                    ></ErrorMessage>
                  </div>

                  <div class="mt-5 confirm d-flex justify-content-md-center">
                    <div>
                      <button
                          type="button"
                          class="btn btn-outline-primary rounded-0"
                      >
                        Thêm vào bảng
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>

              <div class="mt-5 d-flex justify-content-evenly ">
                <table class="table">
                  <thead class="table-secondary">
                  <tr>
                    <th>STT</th>
                    <th>Mã Hàng</th>
                    <th>Tên</th>
                    <th>Số Lượng</th>
                    <th>Size</th>
                    <th>Đơn Giá</th>
                  </tr>
                  </thead>
                  <tbody>
                  {items.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productId}</td>
                        <td>{item.productId}</td>
                        <td>{item.inputQuantity}</td>
                        <td>{item.inputQuantity}</td>
                        <td>{item.inputPrice}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div class="mt-5 confirm d-flex justify-content-md-center">
                <div>
                  <a class="btn btn-outline-secondary me-3 rounded-0">Hủy</a>
                </div>
                <div>
                  <a class="btn btn-outline-primary rounded-0">Xác Nhận</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
