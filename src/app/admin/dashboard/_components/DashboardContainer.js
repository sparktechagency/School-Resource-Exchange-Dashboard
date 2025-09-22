'use client';
import RecentUserTable from './RecentUserTable';
import CustomCountUp from '@/components/CustomCountUp/CustomCountUp';
import { NotebookPen } from 'lucide-react';
import UserStatistics from './UserChart';
import { useGetDashboardDataQuery } from '@/redux/api/dashboardApi';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/features/authSlice';
import { useState } from 'react';
import { Skeleton } from 'antd';

export default function DashboardContainer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const token = useSelector(selectToken);

  // Fetch dashboard data, passing the currentYear
  const { data, isLoading, isError } = useGetDashboardDataQuery({ currentYear }, { skip: !token });

  const stats = data?.data || {};
  // stats Data
  const userStats = [
    {
      key: 'available',
      title: 'Available',
      count: stats?.availableAssets || 0,
      icon: <NotebookPen className="text-[#5CB5EE] w-16 h-16" />,
    },
    {
      key: 'Grabbed',
      title: 'Grabbed',
      icon: <NotebookPen className="text-[#52AA77] w-16 h-16" />,
      count: stats?.grabbedAssets || 0,
    },
    {
      key: 'Overall',
      title: 'Overall',
      icon: <NotebookPen className="text-orange-500 w-16 h-16" />,
      count: stats?.allAssets || 0,
    },
  ];

  const handleYearChange = (year) => {
    setCurrentYear(year);
  };
  if (isLoading)
    return (
      <div className="space-y-20">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 2xl:grid-cols-2">
          <Skeleton.Button
            active={true}
            size={'100px'}
            shape={'square'}
            style={{ height: '120px' }}
            block={true}
          />
          <Skeleton.Button
            active={true}
            size={'100px'}
            shape={'square'}
            style={{ height: '120px' }}
            block={true}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 2xl:grid-cols-2">
          <Skeleton.Button
            active={true}
            size={'100px'}
            shape={'square'}
            style={{ height: '320px' }}
            block={true}
          />
          <Skeleton.Button
            active={true}
            size={'100px'}
            shape={'square'}
            style={{ height: '320px' }}
            block={true}
          />
        </div>
      </div>
    );

  return (
    <div className="space-y-10">
      {/* User Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-3 gap-5">
        {userStats?.map((stat) => (
          <div
            key={stat.key}
            className="bg-[#FFFFFF] p-5 rounded-2xl shadow-sm text-black min-h-[150px] space-y-5"
          >
            {stat.icon}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex  gap-10 items-center w-full">
                <div>
                  <p className="font-dmSans text-2xl font-bold">{stat.title}</p>
                </div>
                <div>
                  <h5 className="text-4xl font-semibold text-black mt-0.5">
                    {stat.key !== 'earning' ? (
                      <CustomCountUp end={stat.count} />
                    ) : (
                      <span>
                        $<CustomCountUp end={stat.count} />
                      </span>
                    )}
                  </h5>
                </div>
              </div>
            </div>
            <h1 className="text-sm text-gray-500">
              There are many passages of Lorem Ipsum available.
            </h1>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="flex-center-between xl:flex-row flex-col gap-10">
        <UserStatistics userStats={stats?.fullStats} onYearChange={handleYearChange} />
      </section>

      {/* Recent Users Table */}
      <section>
        <RecentUserTable />
      </section>
    </div>
  );
}
