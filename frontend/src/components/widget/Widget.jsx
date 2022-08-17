import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { countUsers } from "../../actions/userActions";
import { totalPurchaseOrder } from "../../actions/purchaseOrderAction";
import { totalWarehouseCount } from "../../actions/warehouseAction";
import { totalNoProduct } from "../../actions/productListAction";

function Widget({ type }) {

    let data;
    const dispatch = useDispatch();
    const totalOrderdispatch = useDispatch();
    const warehousedispatch = useDispatch();
    const totalproductDispatch = useDispatch();
    


    const userCount = useSelector((state) => state.userCount);
    const { loading, userCounts, error } = userCount;
    useEffect(() => {
      dispatch(countUsers());
    }, [dispatch]);


    const totalOrder = useSelector((state) => state.totalOrder);
    const {  totalpurchaseOrders } = totalOrder;
    useEffect(() => {
      totalOrderdispatch(totalPurchaseOrder());
    }, [dispatch]);

    const totalWarehouse = useSelector((state) => state.totalWarehouse);
    const {  totalWarehouses } = totalWarehouse;
    useEffect(() => {
        warehousedispatch(totalWarehouseCount());
    }, [dispatch]);

    const totalProduct = useSelector((state) => state.totalProduct);
    const {  totalProducts } = totalProduct;
    useEffect(() => {
        totalproductDispatch(totalNoProduct());
    }, [dispatch]);




    const usercountMemo = useMemo(()=>{
        return userCounts
      },[userCounts]);

    console.log("count users ",userCounts)

    //temporary
    const amount = 100;
    const diff = 20;

    switch (type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                totalUser:userCounts,
                
                //link: "See all users",
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, 0.2)",
                        }}
                    />
                ),
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                totalPurchaseOrder: totalpurchaseOrders,
                isMoney: false,
                //link: "View all orders",
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(218, 165, 32, 0.2)",
                            color: "goldenrod",
                        }}
                    />
                ),
            };
            break;
        case "warehouse":
            data = {
                title: "WAREHOUSE",
                isMoney: false,
                totalNoWarehouse:totalWarehouses,
               // link: "View net earnings",
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon"
                        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
                    />
                ),
            };
            break;
        case "products":
            data = {
                title: "PRODUCTS",
                isMoney: false,
                totalNumberOfProduct: totalProducts,
                //link: "See details",
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: "rgba(128, 0, 128, 0.2)",
                            color: "purple",
                        }}
                    />
                ),
            };
            break;
        default:
            break;
    }
    // {data.totalUser} {data.totalPurchaseOrder}{data.totalNoWarehouse} {data.totalNumberOfProduct}
    return (
        <>
          <div className="widget">
            <div className="left">
                
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"} {data.totalUser || data.totalPurchaseOrder || data.totalNoWarehouse || data.totalNumberOfProduct}</span>
               
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                {/* <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {diff}%
                </div> */}
                <div>
                    {data.icon}
                </div>
            </div>

        </div>
        </>
            
    );
}

export default Widget;