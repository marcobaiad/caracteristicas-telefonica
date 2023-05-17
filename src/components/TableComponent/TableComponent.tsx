function TableComponent({ children }: { children: React.ReactNode }) {
  return (
    <table className="table-fixed border-collapse rounded-md overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="border-collapse border border-slate-300">Localidad</th>
          <th className="border-collapse border border-slate-300 px-4">
            Prefijo
          </th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}
export default TableComponent
