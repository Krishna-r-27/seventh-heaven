import React, { useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

// Initialize the core DataTables library
DataTable.use(DT);

function ContactDataTable() {
    const [data] = useState([
        { date: '2026-01-30', name: 'John Doe', email: 'john@example.com', subject: 'Technical Support' },
        { date: '2026-01-28', name: 'Jane Smith', email: 'jane@web.com', subject: 'Billing Inquiry' },
        { date: '2026-01-25', name: 'Mike Ross', email: 'mike@law.com', subject: 'General Question' },
        { date: '2026-01-20', name: 'Rachel Zane', email: 'rachel@legal.com', subject: 'Partnership' },
    ]);

    const columns = [
        { data: 'date', title: 'Date' },
        { data: 'name', title: 'Name' },
        { data: 'email', title: 'Email' },
        { data: 'subject', title: 'Subject' },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Inquiry Submissions</h1>

            <div className="overflow-x-auto">
                <DataTable
                    data={data}
                    columns={columns}
                    className="display w-full border-b border-gray-200"
                    options={{
                        responsive: true,
                        pageLength: 10,
                        order: [[0, 'desc']], // Sort by Date by default
                    }}
                >
                    <thead className="bg-gray-50 text-gray-700 font-semibold uppercase text-sm">
                        <tr>
                            <th className="px-4 py-3 border-b">Date</th>
                            <th className="px-4 py-3 border-b">Name</th>
                            <th className="px-4 py-3 border-b">Email</th>
                            <th className="px-4 py-3 border-b">Subject</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
        </div>
    );
}

export default ContactDataTable;