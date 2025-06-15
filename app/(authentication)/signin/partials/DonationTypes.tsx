export default function DonationTypes() {
  return (
    <div className="bg-gradient-to-r from-[#005e38] to-[#359960] max-w-[900px] mx-auto text-white text-center p-5 m-5 rounded-xl">
      <h1 className="font-bold text-xl">Be Part Of Solution</h1>
      <p className="text-lg m-3">
        With 733 million people facing hunger worldwide, every food donation
        through MealBridge makes a real difference. Join us in building bridges
        from surplus food to those in need.
      </p>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row">
        <div className="bg-white/10 p-2 rounded-lg">
          <h1 className="font-bold text-xl">🍵 Cooked Meals</h1>
          <p>Fresh, hygienic home or restaurant meals.</p>
        </div>
        <div className="bg-white/10 p-2 rounded-lg">
          <h1 className="font-bold text-xl">🥫Packaged Food</h1>
          <p>Sealed, unexpired snacks or canned items.</p>
        </div>
        <div className="bg-white/10 p-2 rounded-lg">
          <h1 className="font-bold text-xl">🌾 Staple Ingredients</h1>
          <p>Uncooked rice, flour, pulses, etc.</p>
        </div>
      </div>
    </div>
  );
}
