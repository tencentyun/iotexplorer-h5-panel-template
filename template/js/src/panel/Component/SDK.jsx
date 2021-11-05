import React from 'react';
import './SDK.less';

const sdk = window.h5PanelSdk;

export default function API() {
  const showDeviceDetail = async () => {
    const isConfirm = await sdk.tips.confirm('是否展示H5设备详情？');

    if (isConfirm) {
      await sdk.tips.alert('当前选择H5设备详情');

      sdk.showDeviceDetail({
        labelWidth: 120,
        marginTop: 8,
        shareParams: {
          a: 'a',
          b: 'b',
        },
        extendItems: [
          {
            labelIcon: 'https://main.qcloudimg.com/raw/be1d876d55ec2479d384e17c94df0e69.svg',
            label: '自定义菜单',
            content: '自定义菜单内容（可选）',
            onClick: () => console.log('点击自定义菜单'),
          },
        ],
        extendButtons: [
          {
            text: '自定义按钮',
            type: 'warning',
            onClick: () => console.log('点击自定义按钮'),
          },
          {
            text: '获取自定义分享参数',
            onClick: async () => {
              const shareParams = await sdk.getShareParams();
              console.log('自定义分享参数: ', shareParams);
            }
          },
          {
            text: '关闭设备详情',
            type: '',
            onClick: () => sdk.hideDeviceDetail(),
          },
        ],
      });
    } else {
      await sdk.tips.alert('当前选择原生设备详情');

      sdk.goDeviceDetailPage();
    }
  };

  const showTip = () => {
    sdk.tips.alert('您的设备已离线');
  }

  const getDeviceStatus = async () => {
    const status = await sdk.getDeviceStatus();
    sdk.tips.alert(`设备在线状态： ${status ? '在线' : '已离线'}`);
  }

  const getDeviceData = async () => {
    const data = await sdk.getDeviceData();
    sdk.tips.alert(`物模型数据：${JSON.stringify(data, null, 2)}`);
  }

  return (
    <div className="sdk">
      <h3>设备</h3>
      <button onClick={showDeviceDetail}>跳转设备详情</button>
      <button onClick={getDeviceData}>获取物模型信息</button>
      <button onClick={getDeviceStatus}>查看设备在线状态</button>
  
      <h3>界面交互</h3>
      <button onClick={showTip}>显示tip</button>
      <button onClick={() => sdk.showOfflineTip()}>显示离线提示</button>
      <button onClick={() => sdk.goFeedBackPage()}>去反馈页面</button>
    </div>
  )
}
