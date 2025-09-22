import { Trash2 } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import bell from '@/assets/images/bellImage.png';
import { useDeleteSingleNotificationMutation } from '@/redux/api/notificationApi';
import toast from 'react-hot-toast';

export default function NotificationCard({ notification }) {
  // delete sinfle notification
  const [deleteNotification, { isLoading }] = useDeleteSingleNotificationMutation();
  const handledelete = (id) => async () => {
    try {
      const res = await deleteNotification(id).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Notification deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete notification');
    }
  };
  return (
    <div className="flex justify-between gap-x-5">
      <div className="flex-center-start gap-x-5">
        {notification?.userImg ? (
          <Image
            src={notification.userImg}
            alt="user avatar"
            height={1200}
            width={1200}
            className="w-[75px] h-auto aspect-square rounded-full border border-gray-200"
          />
        ) : (
          <Image
            src={bell}
            alt="user avatar"
            className="w-[75px] h-auto aspect-square rounded-full"
          />
        )}

        <p className="text-xl">
          <span className="text-[22px] font-semibold">{notification?.title}</span>{' '}
          <p className="text-dark-gray">{notification?.body}</p>
        </p>
      </div>

      <div className="flex-center-between w-max whitespace-nowrap gap-x-6 mb-7 ml-10">
        <p className="text-dark-gray">{moment(notification?.createdAt).fromNow()}</p>

        <button disabled={isLoading} onClick={handledelete(notification?._id)}>
          <Trash2 size={18} color="#F16365" />
        </button>
      </div>
    </div>
  );
}
