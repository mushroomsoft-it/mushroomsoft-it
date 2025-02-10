export interface IEmployeesSharepoint {
  employeeInfo: EmployeeInfo[];
}

export interface EmployeeInfo {
  id:                 number;
  infoContent:        InfoContent;
  attatchmentContent: AttatchmentContent;
}

export interface AttatchmentContent {
  "$content-type": string;
  $content:        string;
}

export interface InfoContent {
  name:     string;
  position: string;
  carreer:  string;
  expert:   string;
  hobby:    string;
}
