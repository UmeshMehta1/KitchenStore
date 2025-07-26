import React from "react";
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
} from "lucide-react";

const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">
            View detailed business analytics and insights
          </p>
        </div>
      </div>

      {/* Coming Soon Card */}
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <div className="mb-6">
          <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Comprehensive analytics and reporting features are coming soon.
            Track sales performance, customer behavior, and business insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-blue-50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Sales Analytics</h3>
            <p className="text-sm text-gray-600 mt-1">
              Track revenue and sales trends
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-lg">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Customer Insights</h3>
            <p className="text-sm text-gray-600 mt-1">
              Understand customer behavior
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-lg">
            <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Product Performance</h3>
            <p className="text-sm text-gray-600 mt-1">
              Monitor product metrics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
