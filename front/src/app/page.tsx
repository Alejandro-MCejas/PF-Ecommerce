import TeamMembers from "@/components/TeamMembers/TeamMembers";
import { initMercadoPago } from "@mercadopago/sdk-react";


export default function Home() {
  initMercadoPago('APP_USR-82a8c747-15af-4cce-ad00-69ab877f14ad');
  return (
   <div id="_next">
       <TeamMembers/>
   </div>
  );
}
