import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui/table";
import { Button } from "../ui/button";
import { Result } from "../../types";
import LoadingSpinner from "../loading-spinner";
  
const TableDashboard = ({data, isLoading} : {data: Result[], isLoading: boolean}) => {
    return (
      <>
      <Table className="text-slate-100 mb-6">
        <TableHeader className="bg-zinc-800  rounded-t-lg">
          <TableRow className="border-none">
            <TableHead className="w-[100px] text-md text-zinc-400">Name</TableHead>
            <TableHead className="text-md text-zinc-400">Gender</TableHead>
            <TableHead className="text-md text-zinc-400">Birth</TableHead>
            <TableHead className="text-right text-md text-zinc-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((invoice) => (
            <TableRow key={invoice.cell} className="border-b  border-zinc-700 py-6 ">
              <TableCell className="font-medium text-sm">{invoice.name.first} {invoice.name.last}</TableCell>
              <TableCell>{invoice.gender}</TableCell>
              <TableCell>
              {new Date(invoice.dob.date).toLocaleDateString("pt-PT")}
              </TableCell>
              <TableCell className="text-right">
                <Button className="bg-zinc-900 hover:bg-zinc-800">
                    View
                </Button>
              </TableCell>
            </TableRow> 
          ))}
        </TableBody>
        
      </Table>
      {/* {data.length <= 0 && <EmptyCard />} */}
      {isLoading && (
        <div className="size-auto flex flex-col items-center">
            <LoadingSpinner />
               <p className='text-slate-100 text-md font-semibold'>Loading....</p>
        </div>
      )}
      </>
    );
  }
  
export default TableDashboard