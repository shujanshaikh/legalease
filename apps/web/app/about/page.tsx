import Appbar from "../../components/appBar/AppBar";


export default function About(){
  return <div> 
    <Appbar />
    <div className="max-w-3xl">
  <h2 className="text-6xl font-bold mb-6 text-accent">About Us</h2>
  <p className="text-xl text-dark">
    At LegalEase, we strive to provide accessible and reliable legal assistance to individuals and
    businesses alike. Our platform leverages AI technology and experienced legal professionals to help
    you navigate complex legal matters efficiently and confidently.
  </p>
</div></div>
}