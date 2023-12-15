export function SalesReport() {
    return(
        <>
        <div class="container pt-0 form-control">
      <h2 class="text-center pt-5">Thống Kê Doanh Thu</h2>
      <div class="mt-3 d-flex justify-content-md-end">
        <div class="row">
          <div class="col-auto">
            <label for="exampleInputEmail1" class="form-label"
              >Từ ngày</label
            >
          </div>
          <div class="col-auto">
            <input
              type="date"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="col-auto">
            <label for="exampleInputEmail1" class="form-label"
              >đến ngày</label
            >
          </div>
          <div class="col-auto">
            <input
              type="date"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="col-auto">
            <button
              type="submit"
              class="btn btn-outline-primary rounded-0"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
      <div class="row mt-3 d-flex text-center bg-light">
        <div class="col-4">
          <label for="exampleInputEmail1" class="form-label fw-bold"
            >Doanh Thu</label
          >
          <h3 for="exampleInputEmail1" class="form-label">4.000.000</h3>
        </div>
        <div class="col-4">
          <label for="exampleInputEmail1" class="form-label fw-bold"
            >Tổng Chi</label
          >
          <h3 for="exampleInputEmail1" class="form-label">3.000.000</h3>
        </div>
        <div class="col-4">
          <label for="exampleInputEmail1" class="form-label fw-bold"
            >Lợi Nhuận</label
          >
          <h3 for="exampleInputEmail1" class="form-label">1.000.000</h3>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-5">
        <div class="w-75">
          <canvas id="canvas"></canvas>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <a class="btn btn-outline-secondary mb-3 rounded-0"
          >In Thống Kê</a
        >
      </div>
    </div>
        </>
    )
}