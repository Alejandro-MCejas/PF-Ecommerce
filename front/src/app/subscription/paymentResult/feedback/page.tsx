import PaymentResultSuscription from "@/components/PaymentResultSuscription/PaymentResultSuscription";
import PaymentResultView from "@/components/PaymentResultView/PaymentResultView";

const PaymentResult: React.FC = () => {

  return (
    <div className="p-5 w-full max-w-[1000px] mx-auto min-h-[400px] md:min-h-[500px]">
      <div className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
        {/* Tarjeta adaptada */}
        <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
          <div className="w-full rounded-[10px] bg-white p-6">
            <h2 className="text-[30px] md:text-[50px] font-bold text-center mb-3">
              Your subscription payment:
            </h2>
            <PaymentResultSuscription />
          </div>
        </article>
      </div>
    </div>

  );
};

export default PaymentResult;