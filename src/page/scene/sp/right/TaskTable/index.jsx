import React from "react";
// import './style.less';
import { Table } from "antd";
import { withRouter } from "react-router";

const TaskTable = (props) => {
  console.log(" %c TaskTable 组件 this.state, this.props ： ", props, {
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
      title: "任务总量",
      width: 60,
      dataIndex: "VALUE",
    },
    {
      title: "完成数",
      width: 50,
      dataIndex: "COMPLETED_TASK_NUM",
    },
    {
      title: "逾期数",
      width: 50,
      dataIndex: "OVERDUE_TASK_NUM",
    },
    {
      title: "完成率",
      width: 50,
      dataIndex: "COMPLETION_RATE",
      // render: (item, index) => (item ? (item * 1).toFixed(2) + "%" : item), 
    },

    {
      title: "详情",
      dataIndex: "operation",
      width: 40,
      render: (item, index) => {
        return (
          <a
            onClick={(e) =>
              props.history.push(
                `/scene/task?adcode=${index.AD_CODE}&areaLevel=${index.areaLevel}&type=${index.type}`
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

// export default TaskTable;
export default withRouter(TaskTable);
