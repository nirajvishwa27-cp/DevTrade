import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axios";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Globe, TrendingUp, Folder } from "lucide-react";

export default function Profile() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/auth/getMyProfile");
      return res.data.user;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="text-gray-300 animate-pulse">Loading profile...</div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="text-red-500 text-lg font-medium">
          Failed to load profile.
        </div>
      </div>
    );

  const u = data;
  const initials = u.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen w-full bg-black py-14 px-6 md:px-10 flex justify-center">
      <div className="w-full max-w-7xl">

        {/* TITLE */}
        <h1 className="text-white text-4xl font-semibold">Profile Page</h1>

        {/* TABS */}
        <Tabs defaultValue="overview" className="mt-10">
          <TabsList className="bg-gray-900/40 border border-gray-800 backdrop-blur-xl rounded-xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="mt-8 space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* LEFT USER CARD */}
              <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800 rounded-2xl shadow-2xl">
                <CardHeader className="flex flex-col items-center pb-0">

                  <Avatar className="h-28 w-28 shadow-md">
                    <AvatarImage src={u.profileImage} />
                    <AvatarFallback className="bg-gray-700 text-3xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <h2 className="mt-4 text-2xl text-white font-medium">{u.name}</h2>
                  <Badge variant="secondary" className="mt-2 uppercase">
                    {u.role}
                  </Badge>

                </CardHeader>

                <CardContent className="mt-8 space-y-8">

                  {/* STATS */}
                  <div className="grid grid-cols-3 text-center gap-2">
                    <StatBox label="Sales" value={u.sales?.length || 0} icon={TrendingUp} />
                    <StatBox label="Purchases" value={u.purchases?.length || 0} icon={Folder} />
                    <StatBox label="Earnings" value={`₹${u.earnings || 0}`} />
                  </div>

                  {/* INFO */}
                  <div className="space-y-3 text-gray-300 text-sm">
                    <InfoRow icon={Mail} text={u.email} />
                    <InfoRow icon={MapPin} text="India" />
                    <InfoRow icon={Globe} text="devtrade.io" />
                  </div>

                  {/* SKILLS */}
                  <div>
                    <h3 className="text-sm text-gray-400 mb-3">Skills</h3>
                    {u.skills?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {u.skills.map((s, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="border-gray-700 text-xs"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <EmptyText>No skills added</EmptyText>
                    )}
                  </div>

                </CardContent>
              </Card>

              {/* RIGHT ACTIVITY PANEL */}
              <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800 rounded-2xl col-span-2 p-6 shadow-2xl">
                <h2 className="text-white text-xl font-medium">Latest Activity</h2>

                <div className="mt-6 space-y-3">
                  <ActivityItem label="Account Created" date={u.createdAt} />
                  <ActivityItem label="Last Login" date={u.lastLogin} />
                  <ActivityItem label="Profile Viewed" date={Date.now()} />
                </div>
              </Card>

            </div>
          </TabsContent>

          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="mt-10">
            <Card className="bg-gray-900/80 border-gray-800 p-10 text-center rounded-2xl">
              <EmptyText>No projects found.</EmptyText>
            </Card>
          </TabsContent>

          {/* ACTIVITY TAB */}
          <TabsContent value="activity" className="mt-10">
            <Card className="bg-gray-900/80 border-gray-800 p-10 text-center rounded-2xl">
              <EmptyText>No activity history available.</EmptyText>
            </Card>
          </TabsContent>

          {/* ACCOUNT SETTINGS TAB */}
          <TabsContent value="account" className="mt-10">
            <Card className="bg-gray-900/80 border-gray-800 p-10 text-center rounded-2xl">
              <EmptyText>Account settings coming soon.</EmptyText>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}

/* SUB COMPONENTS */
function StatBox({ label, value }) {
  return (
    <div className="bg-gray-800/40 rounded-xl py-3">
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="text-gray-400 text-[11px] uppercase tracking-wide">{label}</p>
    </div>
  );
}

function InfoRow({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 opacity-60" />
      <span>{text}</span>
    </div>
  );
}

function ActivityItem({ label, date }) {
  return (
    <div className="p-4 rounded-xl bg-gray-800/40 border border-gray-800 flex justify-between items-center text-sm">
      <span className="text-gray-300">{label}</span>
      <span className="text-gray-500">{new Date(date).toLocaleString()}</span>
    </div>
  );
}

function EmptyText({ children }) {
  return <p className="text-gray-500 text-sm">{children}</p>;
}
