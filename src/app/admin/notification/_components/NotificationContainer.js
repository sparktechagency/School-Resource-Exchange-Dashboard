'use client';
import NotificationCard from './NotificationCard';
import { Button, Empty } from 'antd';
import {
  useDeleteNotificationMutation,
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
} from '@/redux/api/notificationApi';
import toast from 'react-hot-toast';

export default function NotificationContainer() {
  // get notification from api
  const { data: notification } = useGetMyNotificationQuery();
  const notifications = notification?.data?.data || [];
  const [markAsRead, { isLoading }] = useMarkAsReadMutation();
  const [deleteNotification, { isLoading: isDeleteLoading }] = useDeleteNotificationMutation();
  const handleSubmit = () => async () => {
    try {
      const res = await deleteNotification().unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Notifications deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete notifications ');
    }
  };

  const handleDelete = () => async () => {
    try {
      const res = await markAsRead().unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Notifications deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete notifications');
    }
  };
  return (
    <div className="w-3/4 mx-auto mb-10">
      <section className="mb-10 flex-center-between">
        <h4 className="text-3xl font-semibold">Notifications</h4>

        <div className="space-x-3">
          <Button type="primary" loading={isLoading} onClick={handleSubmit()}>
            Mark as read
          </Button>
          <Button
            loading={isDeleteLoading}
            onClick={handleDelete()}
            className="!bg-danger !text-white"
          >
            Delete all
          </Button>
        </div>
      </section>

      <section className="space-y-8">
        {notification?.length > 0 ? (
          notifications?.map((notification) => (
            <NotificationCard key={notification?._id} notification={notification} />
          ))
        ) : (
          <h4 className="text-2xl font-semibold">
            <Empty description="No notifications found" />
          </h4>
        )}
      </section>
    </div>
  );
}
