import Layout from '../components/blogLayout.js'
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown'

const Post = (props) => (
    <Layout>
     <div className="markdown">
        <Markdown source={`
          This is our blog post.
          Yes. We can have a [link](/link).
          And we can have a title as well.

          <h1>{props.show.name}</h1>

          And here's the content.
        `}/>

       <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
       <img src={props.show.image.medium}/>
     </div>
     <style jsx global>{`
       .markdown {
         font-family: 'Arial';
       }

       .markdown a {
         text-decoration: none;
         color: blue;
       }

       .markdown a:hover {
         opacity: 0.6;
       }

       .markdown h1 {
         margin: 0;
         padding: 0;
         border: 1px solid #fff;
         text-transform: uppercase;
       }
     `}
     </style>
    </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  console.log(`context: ${context}`)
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post
