import Link from 'next/link';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import Card from '../components/BlogCard/BlogCard';

const Post = (props) => (
        <Link as={`/${props.slug}`} href={`/blogpost?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
)

const Index = (props) => {
    return !props.postContent ?
    (<h1>Loading...</h1>)
    :
    (
        <div>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"/>
                <link rel="stylesheet" href="./static/blog.css"/>
            </Head>
            <h1>My blog - by me</h1>
            <ul style={{
                listStyleType: 'none'
                }}
            >
                {
                    props.postContent.map((post, i) => (
                        <li 
                            key={post._id} 
                            style={{
                                margin: '10px', 
                                width: '50%'
                            }}
                        >
                            <Card>
                                <Post 
                                    slug={i}
                                    title={post.title}
                                />
                                <br/>
                                <span>
                                {
                                    post.body.length > 100 ? 
                                        post.body.slice(0, 100) + '...'
                                        :
                                        post.body
                                }
                                </span>
                            </Card>
                        </li>
                            
                    ))
                }
            </ul>
            <footer style={{paddingTop: '50vh'}}>Made by Jason, with NextJS for React</footer>
        </div>
    )
}

Index.getInitialProps = () => {
    return fetch(`http://localhost:3001/home`)
        .then(response => {
            return response.json()
        })
        .then(posts => {
            return {postContent: posts.reverse()}
        })
        .catch(err => console.log(err))
} 

export default Index