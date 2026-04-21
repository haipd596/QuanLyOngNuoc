import { useState } from 'react';
import { 
  Calendar, MapPin, Users, Coffee, Wifi, Tv, 
  CreditCard, CheckCircle2, ChevronRight, ChevronLeft, Star 
} from 'lucide-react';
import { cn } from '../lib/utils';

// --- Placeholder Data ---
const ROOMS = [
  {
    id: 'r1',
    name: 'Ocean View Suite',
    price: 290,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
    amenities: ['King Size Bed', 'Ocean View', 'Balcony'],
    features: [Wifi, Coffee, Tv]
  },
  {
    id: 'r2',
    name: 'Premium Deluxe',
    price: 180,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=600',
    amenities: ['Queen Size Bed', 'City View', 'Workspace'],
    features: [Wifi, Coffee]
  },
  {
    id: 'r3',
    name: 'Minimalist Standard',
    price: 120,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600',
    amenities: ['Double Bed', 'Standard View'],
    features: [Wifi]
  }
];

export function BookingFlow() {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBook = (room: any) => {
    setSelectedRoom(room);
    setStep(2);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API delay with smooth transition
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Visual Stepper */}
      <div className="flex items-center justify-center gap-4 mb-10 mt-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-4">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500",
              step === s 
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-110" 
                : step > s 
                ? "bg-emerald-500 text-white" 
                : "bg-white text-gray-400 border border-gray-200"
            )}>
              {step > s ? <CheckCircle2 size={18} /> : s}
            </div>
            {s < 3 && (
              <div className={cn(
                "w-16 h-1 rounded-full transition-all duration-500",
                step > s ? "bg-emerald-500" : "bg-gray-200"
              )} />
            )}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden w-full">
        {/* STEP 1: Search & Browse (Landing Page Layout) */}
        {step === 1 && (
          <div className="space-y-16 animate-in slide-in-from-right-8 duration-500 pb-16">
            
            {/* HERO SECTION */}
            <div className="relative w-full h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl flex items-center justify-center group">
              <img src="https://images.unsplash.com/photo-1542314831-c6a4d2706864?auto=format&fit=crop&q=80&w=2000" alt="Luxury Hotel" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s] ease-out" />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
              
              <div className="relative z-10 text-center px-4 max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg mb-6">
                  Experience Luxury at Its Finest
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-medium mb-10 drop-shadow-md">
                  Discover a world of comfort, elegance, and unparalleled service in the heart of the city.
                </p>

                {/* Search Bar Mimicking iOS Spotlight */}
                <div className="p-4 bg-white/40 backdrop-blur-3xl border border-white/50 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-wrap gap-4 items-center">
                  <div className="flex-1 min-w-[200px] flex items-center gap-3 px-4 py-3 bg-white/70 rounded-2xl">
                    <MapPin size={20} className="text-gray-500" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Destination</span>
                      <input type="text" placeholder="Where to?" className="bg-transparent text-sm font-bold outline-none text-gray-900 placeholder:text-gray-400" defaultValue="AquaFlow Resort, City Center" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px] flex items-center gap-3 px-4 py-3 bg-white/70 rounded-2xl">
                    <Calendar size={20} className="text-gray-500" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Dates</span>
                      <input type="text" placeholder="Add dates" className="bg-transparent text-sm font-bold outline-none text-gray-900 placeholder:text-gray-400" defaultValue="Oct 12 - Oct 15" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px] flex items-center gap-3 px-4 py-3 bg-white/70 rounded-2xl">
                    <Users size={20} className="text-gray-500" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Guests</span>
                      <input type="text" placeholder="Add guests" className="bg-transparent text-sm font-bold outline-none text-gray-900 placeholder:text-gray-400" defaultValue="2 Adults, 1 Room" />
                    </div>
                  </div>
                  <button className="h-14 px-8 rounded-2xl bg-blue-600/90 hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-900/20 backdrop-blur-md transition-all active:scale-95">
                    Check Availability
                  </button>
                </div>
              </div>
            </div>

            {/* SERVICES / INTRODUCTION */}
            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">World-Class Facilities</h2>
              <p className="text-gray-500 font-medium mb-10">We bring you the finest amenities to ensure your stay is as comfortable and memorable as possible.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Coffee, title: "Fine Dining", desc: "Award-winning restaurants" },
                  { icon: Wifi, title: "Free Wi-Fi", desc: "High-speed everywhere" },
                  { icon: Tv, title: "Smart Room", desc: "Voice-controlled settings" },
                  { icon: Star, title: "Spa & Relax", desc: "Premium wellness center" }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-2 transition-transform duration-500">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-[1.25rem] flex items-center justify-center mb-4">
                      <s.icon size={24} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{s.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ROOMS GRID */}
            <div className="px-4">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Accommodation</h2>
                  <p className="text-gray-500 font-medium mt-2">Carefully curated spaces designed for perfect relaxation.</p>
                </div>
                <button className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                  View All Rooms <ChevronRight size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ROOMS.map((room) => (
                  <div key={room.id} className="group bg-white rounded-[2rem] p-3 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 flex flex-col hover:-translate-y-1">
                    <div className="relative w-full h-[280px] rounded-[1.5rem] overflow-hidden mb-4">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full flex items-center gap-1.5 border border-white/20 shadow-lg">
                        <Star size={14} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-white tracking-wide">{room.rating}</span>
                      </div>
                    </div>
                    <div className="px-4 flex-1 flex flex-col pb-3">
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight">{room.name}</h3>
                      <p className="text-sm text-gray-500 font-medium mt-1.5 mb-5 leading-relaxed">{room.amenities.join(' • ')}</p>
                      
                      <div className="flex gap-2.5 mb-6">
                        {room.features.map((Icon, idx) => (
                          <div key={idx} className="w-9 h-9 rounded-[0.8rem] bg-gray-50 flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm">
                            <Icon size={16} />
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-100/50">
                        <div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-0.5">From</span>
                          <span className="text-2xl font-black tracking-tight text-gray-900">${room.price}</span>
                          <span className="text-xs font-bold text-gray-500"> /night</span>
                        </div>
                        <button 
                          onClick={() => handleBook(room)}
                          className="px-5 h-10 rounded-xl bg-gray-900 hover:bg-blue-600 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Checkout & Details */}
        {step === 2 && selectedRoom && (
          <div className="animate-in slide-in-from-right-8 duration-500 grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Col: User Details */}
            <div className="lg:col-span-3 space-y-6">
              <button 
                onClick={() => setStep(1)} 
                className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors py-2"
              >
                <ChevronLeft size={18} /> Back to Rooms
              </button>

              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-gray-900">Guest Details</h3>
                  <p className="text-sm font-medium text-gray-500">Please enter exactly as it appears on your ID.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="col-span-1 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white" defaultValue="John" />
                  <input type="text" placeholder="Last Name" className="col-span-1 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white" defaultValue="Doe" />
                  <input type="email" placeholder="Email Address" className="col-span-2 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 transition-colors bg-gray-50 focus:bg-white" defaultValue="john.doe@example.com" />
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-gray-900">Payment Option</h3>
                  <div className="flex gap-2">
                    <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center text-[10px] font-bold text-blue-800">VISA</div>
                    <div className="w-10 h-6 bg-orange-100 rounded flex items-center justify-center text-[10px] font-bold text-orange-800">MC</div>
                  </div>
                </div>
                
                {/* HyperOS styled toggle / selection */}
                <div className="p-1 max-w-sm bg-gray-100/80 rounded-2xl flex border border-gray-200/60 mb-6">
                  <button className="flex-1 py-2 text-sm font-bold bg-white text-gray-900 rounded-xl shadow-sm border border-gray-200/50">Credit Card</button>
                  <button className="flex-1 py-2 text-sm font-bold text-gray-500 hover:text-gray-900">Apple Pay</button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <CreditCard size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Card Number" className="w-full border border-gray-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-mono outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors" defaultValue="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="border border-gray-200 rounded-2xl px-4 py-3 text-sm font-mono outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors" defaultValue="12/26" />
                    <input type="text" placeholder="CVC" className="border border-gray-200 rounded-2xl px-4 py-3 text-sm font-mono outline-none focus:border-blue-500 bg-gray-50 focus:bg-white transition-colors" defaultValue="123" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-28 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">Booking Summary</h3>
                
                <div className="flex gap-4">
                  <img src={selectedRoom.image} className="w-20 h-20 rounded-[1.25rem] object-cover" alt="" />
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedRoom.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">3 Nights • 2 Adults</p>
                    <div className="flex items-center gap-1 mt-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-flex">
                      <Star size={10} className="fill-emerald-600" /> {selectedRoom.rating} Wonderful
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">${selectedRoom.price} x 3 nights</span>
                    <span className="font-bold text-gray-900">${selectedRoom.price * 3}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Taxes & Fees</span>
                    <span className="font-bold text-gray-900">$84</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total Price</span>
                  <span className="text-2xl font-bold tracking-tight text-blue-600">${(selectedRoom.price * 3) + 84}</span>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full h-14 bg-gray-900 hover:bg-blue-600 text-white rounded-2xl font-bold shadow-md hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm & Pay'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Success */}
        {step === 3 && (
          <div className="animate-in zoom-in-95 duration-700 flex flex-col items-center justify-center py-20 text-center relative">
             <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none rounded-[3rem]" />
             <div className="w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(52,211,153,0.4)] relative z-10 animate-bounce">
                <CheckCircle2 size={48} className="text-white" />
             </div>
             <h2 className="text-4xl font-bold tracking-tight text-gray-900 relative z-10">Booking Confirmed!</h2>
             <p className="text-gray-500 font-medium mt-4 max-w-sm relative z-10">
               Your reservation at the {selectedRoom?.name} is confirmed. A receipt has been sent to your email.
             </p>

             <div className="mt-12 bg-white border border-gray-100 shadow-sm rounded-[2rem] p-6 max-w-sm w-full relative z-10 flex gap-4 text-left">
                <div className="w-14 h-14 bg-gray-50 rounded-[1.25rem] flex items-center justify-center border border-gray-100 flex-shrink-0">
                   <Calendar size={24} className="text-blue-500" />
                </div>
                <div>
                   <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Confirmation code</span>
                   <p className="text-xl font-mono font-bold text-gray-900 mt-0.5">#AQF-9942A</p>
                </div>
             </div>

             <button 
               onClick={() => { setStep(1); setSelectedRoom(null); }}
               className="mt-12 px-8 py-3 bg-white border-2 border-gray-100 text-gray-900 font-bold rounded-2xl hover:border-gray-200 transition-colors relative z-10"
             >
               Return to Home
             </button>
          </div>
        )}

      </div>
    </div>
  );
}
