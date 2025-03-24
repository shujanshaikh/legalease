export default function Footer(){
    return   <footer className="w-full py-12 text-center bg-dark">
    <div className="max-w-4xl mx-auto px-6">
      <h3 className="text-2xl font-bold mb-6 text-ivory">
        Legal<span className="text-accent">Ease</span>
      </h3>
      <p className="text-lightGray">
        Dedicated to providing exceptional legal services with integrity and professionalism.
      </p>
      <p className="mt-6 text-lightGray">&copy; {new Date().getFullYear()} LegalEase. All rights reserved.</p>
    </div>
  </footer>
}
