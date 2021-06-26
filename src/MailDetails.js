import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const MailDetails = () => {
    const { id } = useParams();
    const { data: mail, error, isPending } = useFetch("http://localhost:8000/mails/" + id);
    const history = useHistory();

    const handleClick = () => {
        fetch("http://localhost:8000/mails/" + mail.id, {
            method: 'DELETE'
        }).then(() => {
            history.push("/");
        })
    }
    return (
        <div className="mail-details">
            { isPending && <div>Loading....</div>}
            { error && <div>{ error }</div>}
            { mail && (
                <article>
                    <h2>{ mail.name }</h2>
                    <p>{ mail.recipient }</p>
                    <p>Subject: {mail.subject}</p>
                    <p>Scheduling: {mail.schedule}</p>
                    <div>{mail.body}</div>
                    <ul>
                        <li>Date: {mail.date}</li>
                        <li>Time: {mail.time}</li>
                    </ul>
                    <button onClick={handleClick}>delete</button>
                </article>
            )}
        </div>
    );
}
 
export default MailDetails;