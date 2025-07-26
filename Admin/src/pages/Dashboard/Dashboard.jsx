import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../store/slices/productSlice";
import { fetchOrders } from "../../store/slices/orderSlice";
import { fetchUsers } from "../../store/slices/userSlice";
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus,
  AlertCircle,
  Calendar,
  Bell,
  Settings,
  ArrowRight,
  RefreshCw,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { totalProducts, isLoading: productsLoading } = useSelector(
    (state) => state.products
  );
  const {
    totalOrders,
    totalRevenue,
    stats,
    isLoading: ordersLoading,
  } = useSelector((state) => state.orders);
  const { totalUsers, isLoading: usersLoading } = useSelector(
    (state) => state.users
  );

  // Dynamic greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([
      dispatch(fetchProducts()),
      dispatch(fetchOrders()),
      dispatch(fetchUsers()),
    ]);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const dashboardStats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+12.5%",
      changeType: "positive",
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50",
      hoverShadow: "hover:shadow-emerald-500/25",
      description: "vs last month",
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingCart,
      change: "+8.2%",
      changeType: "positive",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
      hoverShadow: "hover:shadow-blue-500/25",
      description: "vs last month",
    },
    {
      title: "Total Products",
      value: totalProducts.toLocaleString(),
      icon: Package,
      change: "+3.1%",
      changeType: "positive",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgLight: "bg-purple-50",
      hoverShadow: "hover:shadow-purple-500/25",
      description: "in inventory",
    },
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      icon: Users,
      change: "+15.3%",
      changeType: "positive",
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgLight: "bg-orange-50",
      hoverShadow: "hover:shadow-orange-500/25",
      description: "registered users",
    },
  ];

  const orderStats = [
    {
      status: "Pending",
      count: stats.pending || 0,
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
      bgLight: "bg-yellow-50",
      icon: Clock,
      description: "Awaiting processing",
    },
    {
      status: "On the way",
      count: stats.ontheway || 0,
      color: "bg-blue-500",
      textColor: "text-blue-700",
      bgLight: "bg-blue-50",
      icon: Truck,
      description: "Out for delivery",
    },
    {
      status: "Delivered",
      count: stats.delivered || 0,
      color: "bg-green-500",
      textColor: "text-green-700",
      bgLight: "bg-green-50",
      icon: CheckCircle,
      description: "Successfully delivered",
    },
    {
      status: "Cancelled",
      count: stats.cancelled || 0,
      color: "bg-red-500",
      textColor: "text-red-700",
      bgLight: "bg-red-50",
      icon: XCircle,
      description: "Order cancelled",
    },
  ];

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create a new product listing for your store",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      hoverColor: "hover:from-blue-100 hover:to-blue-200",
      action: () => navigate("/products"),
    },
    {
      title: "View Orders",
      description: "Manage and track customer orders",
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200",
      hoverColor: "hover:from-green-100 hover:to-green-200",
      action: () => navigate("/orders"),
    },
    {
      title: "Manage Users",
      description: "View and manage registered users",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      hoverColor: "hover:from-purple-100 hover:to-purple-200",
      action: () => navigate("/users"),
    },
    {
      title: "Analytics",
      description: "View detailed store analytics",
      icon: BarChart3,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      hoverColor: "hover:from-orange-100 hover:to-orange-200",
      action: () => navigate("/analytics"),
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "order",
      message: "New order #ORD-2024-001 received",
      details: "Customer: John Doe",
      time: "2 minutes ago",
      color: "bg-green-500",
      icon: ShoppingCart,
    },
    {
      id: 2,
      type: "product",
      message: "Product 'Kitchen Mixer' updated",
      details: "Price changed to ₹15,999",
      time: "5 minutes ago",
      color: "bg-blue-500",
      icon: Package,
    },
    {
      id: 3,
      type: "user",
      message: "New user registered",
      details: "Email: user@example.com",
      time: "10 minutes ago",
      color: "bg-orange-500",
      icon: Users,
    },
    {
      id: 4,
      type: "order",
      message: "Order #ORD-2024-987 delivered",
      details: "Customer: Sarah Wilson",
      time: "15 minutes ago",
      color: "bg-purple-500",
      icon: CheckCircle,
    },
    {
      id: 5,
      type: "system",
      message: "Daily backup completed",
      details: "All data backed up successfully",
      time: "1 hour ago",
      color: "bg-gray-500",
      icon: Settings,
    },
  ];

  const isLoading = productsLoading || ordersLoading || usersLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <h3 className="text-lg font-semibold text-gray-700">Loading Dashboard</h3>
          <p className="text-gray-500">Please wait while we fetch your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-8 p-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {greeting}, Admin! 👋
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Here's what's happening with your Kitchen Store today
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-white"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <div className="text-right text-white">
                  <div className="flex items-center space-x-2 text-sm text-blue-100">
                    <Calendar className="w-4 h-4" />
                    <span>Today</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${stat.hoverShadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.bgLight} rounded-xl p-3 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${stat.textColor}`} />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        {stat.changeType === "positive" ? (
                          <TrendingUp className="w-4 h-4 mr-1 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1 text-red-500" />
                        )}
                        <span
                          className={`text-sm font-semibold ${
                            stat.changeType === "positive"
                              ? "text-emerald-600"
                              : "text-red-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-xs text-gray-500">{stat.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts and Analytics Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Order Status Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Order Status Overview
                  </h3>
                  <p className="text-gray-600">Track your order progress</p>
                </div>
                <button
                  onClick={() => navigate("/orders")}
                  className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  <Eye className="w-4 h-4" />
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-6">
                {orderStats.map((item, index) => {
                  const total = orderStats.reduce(
                    (sum, stat) => sum + stat.count,
                    0
                  );
                  const percentage = total > 0 ? (item.count / total) * 100 : 0;
                  const ItemIcon = item.icon;

                  return (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`${item.bgLight} rounded-lg p-2 group-hover:scale-110 transition-transform`}
                          >
                            <ItemIcon className={`w-5 h-5 ${item.textColor}`} />
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900">
                              {item.status}
                            </span>
                            <p className="text-xs text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">
                            {item.count}
                          </span>
                          <span className="ml-2 text-sm text-gray-500">
                            ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-3 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Recent Activity
                  </h3>
                  <p className="text-gray-600">Latest updates</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {recentActivities.map((activity) => {
                  const ActivityIcon = activity.icon;
                  return (
                    <div key={activity.id} className="group hover:bg-gray-50 p-3 rounded-lg transition-colors cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full ${activity.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                        >
                          <ActivityIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-600 mb-2">
                            {activity.details}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 text-sm font-medium text-center text-blue-600 hover:text-blue-700 py-2 hover:bg-blue-50 rounded-lg transition-colors">
                View All Activities
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Quick Actions
                </h3>
                <p className="text-gray-600">Manage your store efficiently</p>
              </div>
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`p-6 rounded-xl border-2 ${action.borderColor} ${action.bgColor} ${action.hoverColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group text-left`}
                  >
                    <div className="text-center">
                      <div className={`inline-flex p-3 rounded-lg ${action.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon
                          className={`w-8 h-8 ${action.color}`}
                        />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2">
                        {action.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {action.description}
                      </p>
                      <div className="mt-3 flex items-center justify-center text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        <span>Get Started</span>
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-blue-900">Performance</h4>
            </div>
            <p className="text-blue-700 text-sm mb-3">
              Your store is performing well this month with steady growth.
            </p>
            <button
              onClick={() => navigate("/analytics")}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
            >
              View Analytics <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-green-900">Order Status</h4>
            </div>
            <p className="text-green-700 text-sm mb-3">
              Most orders are being delivered on time with high satisfaction.
            </p>
            <button
              onClick={() => navigate("/orders")}
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
            >
              Manage Orders <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-purple-900">System Health</h4>
            </div>
            <p className="text-purple-700 text-sm mb-3">
              All systems are running smoothly with no critical issues.
            </p>
            <button
              onClick={() => navigate("/settings")}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center"
            >
              View Settings <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
