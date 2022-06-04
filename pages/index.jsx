import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { React, useState } from 'react';
import moment from 'moment';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  defs,
  Area,
  stop,
  linearGradient
} from 'recharts';

export default function Home() {
  const [assets, setAssets] = useState();
  const [debt, setDebt] = useState();
  const [expenses, setExpenses] = useState();
  const [income, setIncome] = useState();

  const data = [
    {
      name: '20%',
      percent: 0.2,
      months: (assets - debt) / (expenses - income * 0.2),
      futureDate: function() {
        return moment()
          .add(this.months, 'months')
          .format('LL');
      }
    },
    {
      name: '40%',
      percent: 0.4,
      months: (assets - debt) / (expenses - income * 0.4),
      futureDate: function() {
        return moment()
          .add(this.months, 'months')
          .format('LL');
      }
    },
    {
      name: '60%',
      percent: 0.6,
      months: (assets - debt) / (expenses - income * 0.6),
      futureDate: function() {
        return moment()
          .add(this.months, 'months')
          .format('LL');
      }
    },
    {
      name: '80%',
      percent: 0.8,
      months: (assets - debt) / (expenses - income * 0.8),
      cookie: 'yyes',
      futureDate: function() {
        return moment()
          .add(this.months, 'months')
          .format('LL');
      }
    },
    {
      name: '100%',
      percent: 1,
      months: (assets - debt) / (expenses - income * 1),
      futureDate: function() {
        return moment()
          .add(this.months, 'months')
          .format('LL');
      }
    }
  ];

  return (
    <div>
      <h2>Calculate Your Net Worth & Get Your Runway 🚀</h2>
      <h2>
        Your Net Worth 👉 ${assets - debt
          ? (assets - debt).toLocaleString('en-US')
          : ''}{' '}
      </h2>
      <input
        placeholder="Total Cash"
        value={assets}
        name="assets"
        onChange={e => setAssets(e.target.value)}
      />
      <input
        placeholder="Total Debt"
        value={debt}
        name="debt"
        onChange={e => setDebt(e.target.value)}
      />
      <input
        placeholder="Monthly Expenses"
        value={expenses}
        name="expenses"
        onChange={e => setExpenses(e.target.value)}
      />
      <p>Optional</p>
      <input
        placeholder="Projected Monthly Income"
        value={income}
        name="income"
        onChange={e => setIncome(e.target.value)}
      />
      {Boolean(Math.floor((assets - debt) / (expenses - income))) && (
      <h2>
        Your Runway 👉 {Math.floor((assets - debt) / (expenses - income))}{' '}
        months
			</h2>)}
      
      <h1>Projections of Runways</h1>
      {income && debt && assets && expenses && data.map(incomeData => (
        <p>
          {incomeData.name} income ${(
            income * incomeData.percent
          ).toLocaleString('en-US')}
          - runway: {incomeData.months.toFixed(1)} months 📆 ({incomeData.futureDate()})
				</p>
      ))}
      <LineChart width={450} height={300} data={data}>
        <Line type="monotone" dataKey="months" stroke="#8884d8" />
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip />
      </LineChart>
      <AreaChart
        width={450}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis /> <Tooltip />}
				<Area
          type="monotone"
          dataKey="months"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
      <div style={{ marginBottom: '200px' }} />
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
