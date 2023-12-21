import React, {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2";
import {Chart, registerables} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toast}  from "react-toastify";
import * as SalesReportService from "../../services/salesreport/SalesReportService";


Chart.register(...registerables);

function formatDateString(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() ;
  return `${day} thg ${month}`;
}
function formatString(date) {

  const month = date.getMonth() + 1;

  return `${month}`;
}
function SalesReport() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [salesReport, setSalesReport] = useState([]);
  const [spendSalesReport, setSpendSalesReport] = useState([]);
  const [revenueSalesReport, setRevenueSalesReport] = useState([]);
  const [month, setMonth] = useState("");
  const [month1, setMonth1] = useState("");
  const [year, setYear] = useState("");
  const [revenueMonthNowSalesReport, setRevenueMonthNowSalesReport] = useState("");
  const [revenueMonthPreviousSalesReport, setRevenueMonthPreviousSalesReport] = useState("");
  const [revenueMonthPreviousTooSalesReport, setRevenueMonthPreviousTooSalesReport] = useState("");
  const vnd = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })


  const getRevenueMonth = async () =>{
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1
    let currentMonth1 = currentDate.getMonth()
    let currentMonth2 = currentDate.getMonth() - 1
    let year = currentDate.getFullYear()
    setYear(year);
    setRevenueMonthNowSalesReport(await SalesReportService.getRevenueMonth((currentMonth)));
    setRevenueMonthPreviousSalesReport(await SalesReportService.getRevenueMonth((currentMonth1)));
    setRevenueMonthPreviousTooSalesReport(await SalesReportService.getRevenueMonth((currentMonth2)));
    setMonth(currentMonth1);
    setMonth1(currentMonth2);
  }


  const getSalesReport = async () => {
    setSalesReport(await SalesReportService.getAllSreach(startDate, endDate));

  };
  const getSpend = async () => {
    setSpendSalesReport(await SalesReportService.getSpend(startDate, endDate));

  };
  const getRevenue = async () => {
    setRevenueSalesReport(await SalesReportService.getRevenue(startDate, endDate));

  };


  const handleSearch = () => {
    getSalesReport();
    getSpend();
    getRevenue()
    if (endDate === "" ||startDate === ""){
      toast("Vui lòng nhập ngày thống kê")
    }
    if (spendSalesReport.length === 0 && revenueSalesReport.length===0 ){
      toast("Vui lòng thu ngắn khoảng tìm kiếm")
    }
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

  const handleChange = (date) => {
    if (date >= startDate && date <= new Date()) {
      setEndDate(date);
    }
  };

  const labels = spendSalesReport.map((salesReport) => formatDateString(new Date(salesReport.date)));
  const dataRevenue = revenueSalesReport.map((salesReport) => salesReport.revenue);
  const dataSpend = spendSalesReport.map((salesReport) => salesReport.spend);
  const chartData = {
    labels: labels,
    datasets: [
      {
        type: "bar",
        label: "Doanh thu",
        borderColor: "rgba(32, 201, 151, 0.5)",
        data: dataRevenue,
        pointRadius: dataRevenue.map(value => value !== 0 ? 4 : 0),
        backgroundColor: 'rgba(32, 201, 151, 1.0)',
      },
    ],
  };

  const options = {
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ngày'
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'VNĐ'
        },
        ticks: {
          font: {
            family: "Verdana",
            size: 16,
            weight: "normal",
          },
        },
      }
    },
    plugins: {
      subtitle: {
        display: true,
        text: 'CITY 6 FSHOP',
        color: 'black',
        font: {
          size: 16,
          family: 'tahoma',
          weight: 'normal',
          style: 'bold'
        },
        padding: {
          bottom: 10
        }
      }
    }
  };

  useEffect(() => {
    getSpend();
  }, []);
  useEffect(() => {
    getRevenue();
  }, []);
  useEffect(() => {
    getRevenueMonth();
  }, []);

  if (!revenueMonthNowSalesReport) return  null


  return (
      <>
        <div className="container pt-5 pb-5 form-control">
          <h2 className="text-center mt-5 text-primary fw-bold">THỐNG KÊ DOANH THU</h2>
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
          <div className="bg-light">
            <h5 className=" fw-bold ms-2 ms-5 text-primary text mt-5">Doanh thu 3 tháng gần đây</h5>
            <div className="container">
             <table className="table text-center">
               <thead>
               <tr>
                 <th>Tháng {month1}/{year}</th>
                 <th>Tháng {month}/{year}</th>
                 <th>Tháng Này</th>
               </tr>
               </thead>
               <tbody className="text-danger fw-bold">
                  <td>{vnd.format(revenueMonthPreviousTooSalesReport.revenue)} </td>
                  <td>{vnd.format(revenueMonthPreviousSalesReport.revenue)} </td>
                  <td>{vnd.format(revenueMonthNowSalesReport.revenue)} </td>
               </tbody>
             </table>
            </div>

          </div>

          <div className="row mt-5">
            <div className="col-lg-12">
              <Bar data={chartData} options={options} id="myChart" style={{width: "100%", margin: "0 auto"}}/>
            </div>
          </div>
        </div>
      </>
  );
}

export default SalesReport;