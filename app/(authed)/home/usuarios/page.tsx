import UsersDataTable from '@/components/data-table/components/users-data-table';
import React from 'react'

    async function fetchUsers() {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        return res.json();
    }

export default async function AllUsersPage() {
    const users = await fetchUsers()
     
  return (
    <main className="sm:ml-14 p-4 flex flex-col space-y-5 mt-4 md:mt-12 md:px-8">
      <UsersDataTable users={users}/>
    </main>
  )
}
