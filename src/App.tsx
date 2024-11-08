import { useState } from "react";
import { Input } from "./components/ui/input";
import GridContainer from "./components/grid";
import Header from "./components/header/header";
import TableDashboard from "@/components/Table/table";
import Pagination from "./components/pagination/pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PatientService } from "./service/get-patient";
import { ApiResponse, Result } from "./types/index";
import { useSearchParams } from "react-router-dom";

const App = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("5")

  const { data: dataPatient, isLoading } = useQuery<ApiResponse>({
    queryKey: ["get-patient", page, rowsPerPage],
    queryFn: () => PatientService.getPatient({ page, rowsPerPage }),
    placeholderData: keepPreviousData,
  });

 
  const filteredResults = dataPatient?.results.filter((patient: Result) => {
    const fullName = `${patient.name.first} ${patient.name.last}`.toLowerCase();
    const nationality = patient.nat.toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || nationality.includes(term);
  }) ?? [];


  return (
   <main className="h-dvh bg-zinc-950">
     <div className="w-full h-auto bg-zinc-950  scroll-container">
      <GridContainer className="flex flex-col gap-16">
        <Header />
        <div className="w-full h-auto flex flex-col gap-5">
          <h2 className="text-md text-slate-200 text-[0.9rem] mb-5">
            Opus igitur est dicere possit dura omni specie, "Tu autem in specie, non ventur, nec omnino
            res est." Et examine ab eis praecepta eius quae habes, et primo et principaliter
          </h2>
          <Input
            type="text"
            placeholder="Search name or nationality"
            className="border-none bg-zinc-900 py-3 placeholder:text-zinc-200 text-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TableDashboard data={filteredResults} isLoading={isLoading}/>
          <Pagination
           pages={dataPatient?.info.page ?? 0} 
          setRowsPerPage={setRowsPerPage} 
          page={page} 
          rowsPerPage={rowsPerPage}
           />
        </div>
      </GridContainer>
    </div>
   </main>
  );
}

export default App;
