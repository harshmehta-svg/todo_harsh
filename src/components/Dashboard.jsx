import React from 'react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%' },
    { label: 'Total Sales', value: '$45,678', change: '+8%' },
    { label: 'Active Orders', value: '89', change: '+23%' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm mb-2">{stat.label}</h3>
            <div className="flex justify-between items-end">
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recent Activity</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-semibold text-gray-800">Activity {item}</p>
                <p className="text-sm text-gray-500">Description of activity</p>
              </div>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;