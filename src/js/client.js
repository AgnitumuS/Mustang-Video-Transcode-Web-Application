import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Overview from "./pages/Overview";
import Layout from "./pages/Layout";
import HistoryPage from "./pages/History";
import Process0 from "./pages/Process";
import { get_cpu_gpu,get_cardInfo} from './api';
import { cardInfo } from './config';

const callback = function(){
  setInterval(get_cpu_gpu,1000);
  const app = document.getElementById('app');
  var A = React.createClass({

        render: function () {
            var tmp_process_List=[];
            for(var i=0;i < cardInfo.cardNum;i++){
              var str = "Process"+i;
              tmp_process_List.push(str);
            }
            var Process_List=[];
            Process_List = tmp_process_List.map((x,i)=><Route key={i} path={x} name={x} component={() => (<Process0 num={i} />)}></Route>);
            return (<Router history={hashHistory}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Overview}></IndexRoute>
                {Process_List}
                <Route path="history" name="history" component={HistoryPage}></Route>
              </Route>
            </Router>
          );
        }
    });
ReactDOM.render(<A />, app);
  // ReactDOM.render(
  //   <Router history={hashHistory}>
  //     <Route path="/" component={Layout}>
  //       <Route path="archives(/:article)" name="archives" component={Overview}></Route>
  //       <Route path="Process0" name="Process0" component={() => (<Process0 num={0} />)}></Route>
  //       <Route path="Process1" name="Process1" component={() => (<Process0 num={1} />)}></Route>
  //       <Route path="Process2" name="Process2" component={() => (<Process0 num={2} />)}></Route>
  //       <Route path="view" name="view" component={View}></Route>
  //       <Route path="config" name="config" component={Config}></Route>
  //     </Route>
  //   </Router>,
  // app);
}

get_cardInfo(callback);
