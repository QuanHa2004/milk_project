import React from "react";

export default function CreatePromotion() {
  return (
    <div className="font-display bg-whites dark:bg-background-dark">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex flex-row min-h-screen">
          

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-4xl mx-auto">
              {/* Page Heading */}
              <div className="flex flex-wrap justify-between gap-3 mb-8">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-[#111618] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    Create New Promotion Code
                  </p>
                  <p className="text-[#617c89] dark:text-gray-400 text-base font-normal leading-normal">
                    Fill in the details below to create a new promotion for your customers.
                  </p>
                </div>
              </div>

              {/* Form Container */}
              <div className="bg-white dark:bg-background-dark dark:border dark:border-gray-700 rounded-xl p-8 shadow-sm">
                <form className="space-y-8">
                  {/* Promotion Details */}
                  <section>
                    <h3 className="text-lg font-semibold text-[#111618] dark:text-white mb-4">
                      Promotion Details
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                          Promotion Code
                        </p>
                        <input
                          className="form-input flex w-full rounded-lg text-[#111618] dark:text-white focus:ring-2 focus:ring-primary/50 border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                          placeholder="e.g., FRESHMILK10"
                        />
                      </label>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col">
                          <p className="text-[#111618] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                            Discount Type
                          </p>
                          <select className="form-select flex w-full rounded-lg text-[#111618] dark:text-white focus:ring-2 focus:ring-primary/50 border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]">
                            <option value="">Select type</option>
                            <option value="percentage">Percentage</option>
                            <option value="fixed">Fixed Amount</option>
                          </select>
                        </label>

                        <label className="flex flex-col">
                          <p className="text-[#111618] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                            Discount Value
                          </p>
                          <input
                            type="number"
                            className="form-input flex w-full rounded-lg text-[#111618] dark:text-white focus:ring-2 focus:ring-primary/50 border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                            placeholder="e.g., 10 or 5.00"
                          />
                        </label>
                      </div>
                    </div>
                  </section>

                  {/* Validity & Status */}
                  <section>
                    <h3 className="text-lg font-semibold text-[#111618] dark:text-white mb-4">
                      Validity &amp; Status
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="flex flex-col">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Start Date
                        </p>
                        <input
                          type="date"
                          className="form-input rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                        />
                      </label>
                      <label className="flex flex-col">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          End Date
                        </p>
                        <input
                          type="date"
                          className="form-input rounded-lg border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800 h-14 p-[15px]"
                        />
                      </label>
                    </div>

                    <div className="mt-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 rounded text-primary border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                        <span className="text-[#111618] dark:text-gray-300 text-base font-medium">
                          Activate Promotion
                        </span>
                      </label>
                    </div>
                  </section>

                  {/* Metadata */}
                  <section>
                    <h3 className="text-lg font-semibold text-[#111618] dark:text-white mb-4">
                      Metadata
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <label className="flex flex-col w-full">
                        <p className="text-[#111618] dark:text-gray-300 text-base font-medium pb-2">
                          Created By
                        </p>
                        <input
                          readOnly
                          value="admin@milkco.com"
                          className="form-input flex w-full rounded-lg text-[#617c89] dark:text-gray-400 border border-[#dbe2e6] dark:border-gray-600 bg-white dark:bg-gray-900 h-14 p-[15px] cursor-not-allowed"
                        />
                      </label>
                    </div>
                  </section>

                  {/* Action Buttons */}
                  <div className="flex justify-end items-center gap-4 pt-4 border-t border-[#dbe2e6] dark:border-gray-700">
                    <button
                      type="button"
                      className="flex min-w-[84px] h-12 px-6 items-center justify-center rounded-lg bg-white dark:bg-gray-700 dark:text-white border border-[#dbe2e6] dark:border-gray-600 text-[#111618] text-sm font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex min-w-[84px] h-12 px-6 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold"
                    >
                      Create Promotion
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
