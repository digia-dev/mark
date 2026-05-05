import React from 'react';
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const PipelineFunnelChart = ({ data }) => {
  const chartData = [
    { name: 'Prospek', value: data?.prospek || 0, fill: '#2563EB' },
    { name: 'Negosiasi', value: data?.negosiasi || 0, fill: '#F59E0B' },
    { name: 'Penawaran', value: data?.penawaran || 0, fill: '#9333EA' },
    { name: 'Closing', value: data?.closing || 0, fill: '#16A34A' },
    { name: 'Instalasi', value: data?.instalasi || 0, fill: '#0891B2' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[300px]">
      <div className="mb-4">
        <h3 className="text-sm font-black text-gray-900">Pipeline Funnel</h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Konversi Penjualan</p>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <FunnelChart>
          <Tooltip 
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
            cursor={{ fill: 'transparent' }}
          />
          <Funnel
            dataKey="value"
            data={chartData}
            isAnimationActive
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <LabelList position="right" fill="#64748b" stroke="none" dataKey="name" fontSize={10} fontWeight="bold" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PipelineFunnelChart;
