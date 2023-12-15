export function WarehouseCreate(){
    return(
        <>
    <div class="container  mt-3 p-5 form-control">
      <div class="d-flex justify-content-center">
        <div class="input-card form-control shadow-lg ">
          <h2 class="input-title">Nhập Kho</h2>
          <form class="input-form">
            <div class="input-group">
              <input
                placeholder=""
                type="text"
                name="ngaydang"
                id="validationDefault01"
                disabled
              />
              <label for="validationDefault01">Mã phiếu</label>
            </div>
            <div class="input-group">
              <input
                placeholder=""
                type="text"
                name="ngaydang"
                id="validationDefault01"
                disabled
              />
              <label for="validationDefault01">Người nhập</label>
            </div>
            <div class="input-group">
              <input
                placeholder=""
                type="text"
                name="ngaydang"
                id="validationDefault01"
                disabled
              />
              <label for="validationDefault01">Ngày nhập kho</label>
            </div>
            <div class="input-group">
              
              <input
                
                list="datalistOptions"
                id="exampleDataList"
                placeholder=""
              />
              <label for="exampleDataList" 
                >Tên sản phẩm</label
              >
              <datalist id="datalistOptions">
                <option value=""></option>
                <option value="San Francisco"></option>
                <option value="New York"></option>
                <option value="Seattle"></option>
                <option value="Los Angeles"></option>
                <option value="Chicago"></option>
              </datalist>
            </div>
            <div class="input-group">
              <input
                placeholder=""
                type="text"
                name="ngaydang"
                id="validationDefault01"
              />
              <label for="validationDefault01">Số lượng</label>
            </div>
            <div class="input-group">
              <input
                placeholder=""
                type="text"
                name="ngaydang"
                id="validationDefault01"
              />
              <label for="validationDefault01">Size</label>
            </div>
          </form>
        </div>
      </div>
      
    <div class="mt-5 confirm d-flex justify-content-md-center">
      <div>
        <a class="btn btn-outline-primary rounded-0">Thêm vào bảng</a>
      </div>
    </div>
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
          <tr>
            <td>1</td>
            <td>MH-001</td>
            <td>Quần jean</td>
            <td>50</td>
            <td>M,L</td>
            <td>1.000.000</td>
          </tr>
          <tr>
            <td>2</td>
            <td>MH-002</td>
            <td>Quần Kaki</td>
            <td>50</td>
            <td>M,L</td>
            <td>1.000.000</td>
          </tr>
          <tr>
            <td>3</td>
            <td>MH-03</td>
            <td>Quần Tây</td>
            <td>50</td>
            <td>M,L</td>
            <td>1.000.000</td>
          </tr>
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
        </>
    )
}