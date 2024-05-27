import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home()
{
    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">URL Shortening Service</h1>
                    <p className="card-text">
                        This method shortens URLs by generating a random string of characters. We use a model to store the original URL, the shortened URL, and the creation date. Here's how it works:
                    </p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Model:</strong> We store the original URL, its shortened version, and the creation date in a ShortUrl model.</li>
                        <li className="list-group-item"><strong>Character Set:</strong> We use a predefined set of characters (letters and numbers) to create the shortened URL.</li>
                        <li className="list-group-item"><strong>Random Generation:</strong> The GenerateShortUrl method generates a random string of a specified length (default is 7 characters) using the predefined character set.</li>
                        <li className="list-group-item"><strong>Usage:</strong> When you need to shorten a URL, the method produces a random, unique string which represents the shortened URL.</li>
                        <li className="list-group-item"><strong>Example in action:</strong> You have a long URL, and using the method, you get a shorter version like "abc1234" which maps to the original URL.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}