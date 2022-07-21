import "./warehouse.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Datatables from "../../components/datatable/Datatables"
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { warehouseListAction } from "../../actions/warehouseAction";
import WarehouseTable from "../../components/warehouseTable/WarehouseTable";


const WareHouseList = () => {

    const dispatch = useDispatch();
    const warehouseList = useSelector((state) => state.warehouseList);
    const { loading, warehouseLists, error } = warehouseList;
    useEffect(() => {
      dispatch(warehouseListAction());
    }, [dispatch]);
  return (
    <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar />
      {/* <Table/> */}
      <div>
        {loading ? (
          <h2>Loading ....</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (

          (

            
              <div className="datatable">
                   <div className="datatableTitle">
                    Add New Warehouse
                        <Link to="/warehouses/add" className="link">
                           Add New
                         </Link>
                    </div>
                    <div>
                    <WarehouseTable  warehouseLists={warehouseLists} />
                    </div>
              </div>
          )
       
        )}
      </div>
    </div>
  </div>
  )
}

export default WareHouseList;