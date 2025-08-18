export default function RegisterPage() {
  return (
    <div className="w-full h-screen bg-[url(./loginbg.jpg)] bg-cover bg-center flex justify-center items-center">
      <div className="w-[500px] h-[500px] backdrop-blur-2xl bg-white/10 border border-white/20 
                      rounded-[30px] shadow-2xl text-white flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Sign Up</h1>

        <div className="w-full flex flex-col items-start gap-2">
          <span className="text-lg">Email</span>
          <input type="text" className="w-full h-[45px] border border-white rounded-md px-3 bg-white/20 placeholder-white/60" placeholder="Enter your email"/>
        </div>

        <div className="w-full flex flex-col items-start gap-2 mt-4">
          <span className="text-lg">Password</span>
          <input type="password" className="w-full h-[45px] border border-white rounded-md px-3 bg-white/20 placeholder-white/60" placeholder="Enter password"/>
        </div>

        <button className="w-full h-[45px] bg-amber-500 rounded-xl text-white text-lg mt-6 hover:bg-amber-600 transition-all duration-300">
          Create Account
        </button>
      </div>
    </div>
  );
}
