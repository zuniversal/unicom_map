import React from "react";
// import './style.less';
import { Table } from "antd";
import { withRouter } from "react-router";

const WorkTable = (props) => {
  console.log(" %c WorkTable 组件 this.state, this.props ： ", props, {
    ...props,
  }); //

  const columns = [
    {
      title: "排名",
      width: 40,
      dataIndex: "index",
    },
    {
      title: "区域",
      width: 50,
      dataIndex: "NAME",
    },
    {
      title: "工单数",
      width: 50,
      dataIndex: "VALUE",
    },
    {
      title: "触达率",
      width: 50,
      render: (item, index) => (item ? (item * 1).toFixed(2) + "%" : item), 
      dataIndex: "TOUCH_RATE",
    },
    {
      title: "转换率",
      width: 60,
      dataIndex: "CONVERT_RATE",
      render: (item, index) =>
        item ? (item * 100).toFixed(2) + "%" : item,
    },

    {
      title: "详情",
      dataIndex: "operation",
      width: "50",
      render: (item, index) => {
        return (
          <a
            onClick={(e) =>
              props.history.push(
                `/scene/work?adcode=${index.AD_CODE}&areaLevel=${index.areaLevel}&type=${index.type}`
              )
            }
          >
            详情
          </a>
        );
      },
    },
  ];

  return <Table columns={columns} {...props}></Table>;
};

export default withRouter(WorkTable);
