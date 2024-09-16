import Blog from "../components/Blog/Blog"
import CaseStudies from "../components/Blog/CaseStudies"
import TeachingGuide from "../components/Blog/TeachingGuide"

const Blogs = () => {
  return (
    <div className="px-4 xl:px-32 lg:px-32 md:px-20 py-8 xl:py-8 lg:py-8 md:py-4">
      <div className="mb-8">
        <Blog/>
      </div>
      <div className="my-8">
        <CaseStudies/>
      </div>
      <div className="my-8">
       <TeachingGuide/>
      </div>
    </div>
  )
}

export default Blogs