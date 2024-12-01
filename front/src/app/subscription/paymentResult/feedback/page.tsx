import PaymentResultSuscription from "@/components/PaymentResultSuscription/PaymentResultSuscription";
import PaymentResultView from "@/components/PaymentResultView/PaymentResultView";

const PaymentResult: React.FC = () => {
  
  return (
    <div className="p-5">
        <div className="w-full max-w-[1000px] mx-auto bg-white p-4 min-h-[500px] rounded-lg">
          <h2 className="text-[50px] font-bold text-center mb-3">Your subscription</h2>
          <PaymentResultSuscription/>
        </div>
    </div>
  );
};

export default PaymentResult;