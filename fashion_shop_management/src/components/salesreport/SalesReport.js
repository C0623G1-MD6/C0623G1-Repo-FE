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

function SalesReport() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [salesReport, setSalesReport] = useState([]);
  const [spendSalesReport, setSpendSalesReport] = useState([]);
  const [revenueSalesReport, setRevenueSalesReport] = useState([]);


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
    if (spendSalesReport.length === 0 && revenueSalesReport.length===0){
      toast("Vui lòng chỉ thống kê 2 năm gần đây")
    }
  };

  const handleStartDateChange = (date) => {
    if (date <= endDate) {
      setStartDate(date);
    }else{
      toast("Vui lòng nhập ngày bắt đầu trước ngày hiện tại");
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate && date <= new Date()) {
      setEndDate(date);
    }else if((Math.ceil(Math.abs(endDate.getTime()-startDate.getTime()))/(1000*3600*24)) >730){
      toast("Vui lòng nhập trong khoảng 2 năm gần đây");
    }else {
      toast("Vui lòng nhập kết thúc đúng");
    }
  };

  const handleChange = (date) => {
    if (date >= startDate && date <= new Date()) {
      toast("Vui lòng nhập ngày bắt đầu đúng");
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
        type: "line",
        label: "Tổng Chi",
        bac: "rgba(108, 117, 125, 0.5)",
        data: dataSpend,
        pointRadius: dataSpend.map(value => value !== 0 ? 4 : 0),
        backgroundColor: 'rgba(108, 117, 125, 1.0)',
      },
      {
        type: "line",
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
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ngày'
        },
        ticks: {
          font: {
            family: "Verdana",
            size: 14,
            weight: "normal",
          },
        },
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
      title: {
        display: true,
        text: `Thống kê từ ngày ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()}`,
        font: {
          size: 16,
          family: 'tahoma',
          weight: 'normal',
        },
      },
      subtitle: {
        display: true,
        text: 'CITY 6 FSHOP',
        color: 'blue',
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

  return (
      <>
        <div className="container pt-5 pb-5 form-control">
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
                  minDate={'2023-01-01'}
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
              <Bar data={chartData} options={options} id="myChart" style={{width: "100%", margin: "0 auto"}}/>
            </div>
          </div>
        </div>
      </>
  );
}

export default SalesReport;