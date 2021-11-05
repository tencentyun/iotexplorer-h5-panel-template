import React, { useEffect, useState, useRef } from "react";
import SDK from './Component/SDK';
// 如果使用了官方组件库
// import { BoolWidget } from 'qcloud-iot-panel-component';

import './DevicePanel.less';

const sdk = window.h5PanelSdk;
console.log('h5 sdk', sdk);

export default function DevicePanel() {
  return (
    <div className="panel">
      <h3>DevicePanel Demo</h3>
      <SDK />
    </div>
  );
}
