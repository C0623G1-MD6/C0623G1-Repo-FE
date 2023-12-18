import React, {useEffect, useState} from "react";
import {Bar, Line} from "react-chartjs-2";
import {Chart, registerables} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as SalesReportService from "../../services/SalesReportService";


Chart.register(...registerables);

function formatDateString(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}/${month}`;
}

function SalesReport() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [salesReportProduct, setSalesReportProduct] = useState([]);


  const getSearchSalesReport = async () => {
    setSalesReportProduct(await SalesReportService.getAllSreach(startDate, endDate));

  };

  const getSearchSalesReportProduct = async () => {
    let isSearchTermFound = false;


    if (isSearchTermFound) {
      setSalesReportProduct(await SalesReportService.getAllSreach(startDate, endDate));
    } else {
      getSearchSalesReport();
    }
  };

  const handleSearch = () => {
    getSearchSalesReportProduct();
  };

  const handleStartDateChange = (date) => {
    if (date <= endDate) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate && date <= new Date()) {
      setEndDate(date);
    }
  };

  const labels = salesReportProduct.map((salesReport) => formatDateString(new Date(salesReport.date)));
  const dataRevenue = salesReportProduct.map((salesReport) => salesReport.revenue);
  const dataSpend = salesReportProduct.map((salesReport) => salesReport.spend);
  const chartData = {
    labels: labels,
    datasets: [
      {
        type: "bar",
        label: "Tổng Chi",
        backgroundColor: "rgba(255, 99, 132, 1.0)",
        data: dataSpend,
        yAxisID: "y1",
      },
      {
        type: "line",
        label: "Doanh thu (VND)",
        backgroundColor: "rgba(75, 192, 192, 1.0)",
        borderWidth: 2,
        fill: false,
        data: dataRevenue,
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        scaleLabel: {
          display: true,
          labelString: "Ngày",
        },
      },
      y1: {
        beginAtZero: true,
        min: 0,
        scaleLabel: {
          display: true,
          labelString: "Tổng chi",
        },
      },
      y2: {
        beginAtZero: true,
        min: 0,
        position: "right",
        scaleLabel: {
          display: true,
          labelString: "Doanh thu (VND)",
        },
      },
    },
  };

  useEffect(() => {
    getSearchSalesReport();
  }, []);

  return (
      <>
        <div className="container pt-5 pb-5">
          <h2 className="text-center mt-5 text-primary">Thống Kê Doanh Thu</h2>
          <div className="row mt-5">
            <div className="col-md-4"></div>
            <div className="col-md-2">
              <label htmlFor="startDate">Ngày Bắt Đầu:</label>
              <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  maxDate={endDate}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="endDate">Ngày Kết Thúc:</label>
              <DatePicker
                  className="form-control"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  maxDate={new Date()}
              />
            </div>

            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-outline-primary me-2 text-center" onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-12">
              <Bar data={chartData} options={options} id="myChart" style={{width: "80%", margin: "0 auto"}}/>
            </div>
          </div>
        </div>
      </>
  );
}

export default SalesReport;