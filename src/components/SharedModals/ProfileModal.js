'use client';
import { Modal } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Mail, MapPin, User, GraduationCap, Calendar, Phone, Award } from 'lucide-react';

export default function ProfileModal({ open, setOpen, selectedPrincipal, selectedteacher }) {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!selectedPrincipal && !selectedteacher) {
      return;
    }
    if (selectedPrincipal || selectedteacher) {
      setData(selectedPrincipal);
      setUser(selectedteacher);
    }
  }, [selectedPrincipal, selectedteacher]);

  const getInitials = (name) => {
    if (!name) return 'NA';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const InfoCard = ({ icon: Icon, label, value, className = '' }) => (
    <div
      className={`bg-card border border-border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-primary/20 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
          <p className="text-foreground font-medium break-words">{value || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status, role }) => {
    const getStatusColor = (status) => {
      switch (status?.toLowerCase()) {
        case 'active':
          return 'bg-primary/10 text-white border-primary/20';
        case 'inactive':
          return 'bg-destructive/10 text-destructive border-destructive/20';
        default:
          return 'bg-accent/10 text-accent border-accent/20';
      }
    };

    return (
      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1.5 text-sm font-medium rounded-full border ${getStatusColor(
            status || 'active'
          )}`}
        >
          {status || 'Active'}
        </span>
        <span className="px-3 py-1.5 text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20 rounded-full">
          {role}
        </span>
      </div>
    );
  };

  const currentData = selectedPrincipal || user;
  const role = selectedPrincipal ? 'Principal' : 'Teacher';

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={700}
      className="profile-modal"
      styles={{
        content: {
          padding: 0,
          borderRadius: '1rem',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid hsl(var(--border))',
        },
        mask: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <div className="bg-background">
        {/* Header Section with Gradient */}
        <div className="relative bg-gradient-to-br from-primary-green via-primary-blue to-primary/80 px-8 pt-8 pb-20">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
          <div className="relative flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground mb-1">Staff Profile</h1>
              <p className="text-primary-foreground/80 text-sm">Educational Staff Information</p>
            </div>
            <StatusBadge status={currentData?.status} role={role} />
          </div>
        </div>

        {/* Profile Image Section - Overlapping */}
        <div className="relative px-8 -mt-12 mb-6">
          <div className="flex items-end gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl border-4 border-card bg-card shadow-xl overflow-hidden group">
                {currentData?.userImg ? (
                  <Image
                    src={currentData.userImg || '/placeholder.svg'}
                    alt={`${currentData?.name || 'User'} profile`}
                    height={96}
                    width={96}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-blue via-primary-green to-primary/80 text-primary-foreground text-2xl font-bold ">
                    {getInitials(currentData?.name)}
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full border-4 border-card flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1 pb-2">
              <h2 className="text-2xl font-bold text-foreground mb-1 mt-14">
                {currentData?.name || 'Name not provided'}
              </h2>
              <p className="text-muted-foreground font-medium">
                {role} • {currentData?.district || currentData?.school || 'Institution'}
              </p>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <InfoCard icon={Mail} label="Email Address" value={currentData?.email} />
            {/* <InfoCard icon={Phone} label="Phone Number" value={currentData?.phone} /> */}
            <InfoCard
              icon={MapPin}
              label={selectedPrincipal ? 'District' : 'School'}
              value={currentData?.district || currentData?.school}
            />
            {/* <InfoCard
              icon={GraduationCap}
              label="Department"
              value={currentData?.department || currentData?.subject}
            /> */}
          </div>

          {/* Additional Information */}
          {(currentData?.experience || currentData?.qualifications) && (
            <div className="grid grid-cols-1 gap-4 mb-6">
              {currentData?.experience && (
                <InfoCard
                  icon={Calendar}
                  label="Years of Experience"
                  value={`${currentData.experience} years`}
                  className="md:col-span-1"
                />
              )}
              {currentData?.qualifications && (
                <InfoCard
                  icon={Award}
                  label="Qualifications"
                  value={currentData.qualifications}
                  className="md:col-span-1"
                />
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              onClick={() => setOpen(false)}
              className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted/50 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
