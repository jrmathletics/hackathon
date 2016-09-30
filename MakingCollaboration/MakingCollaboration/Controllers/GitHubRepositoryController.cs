using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CSharp.GitHub;
using System.Text;
using Newtonsoft.Json;
using Octokit;
using System.IO;

namespace MakingCollaboration.Controllers
{
    public class GitHubRepositoryController : ApiController
    {
        // GET api/<controller>
        public string Get()
        {
            var repos = WebRequest("https://api.github.com/user/repos");
            return repos;
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
        protected String WebRequest(string url)
        {
            url += (String.IsNullOrEmpty(new Uri(url).Query) ? "?" : "&") + "access_token=" + ConfigurationManager.AppSettings.Get("GitHubAccessToken");
            HttpWebRequest webRequest = System.Net.WebRequest.Create(url) as HttpWebRequest;
            webRequest.Method = "GET";
            webRequest.UserAgent = "MakingCollaboration";
            webRequest.ServicePoint.Expect100Continue = false;
            try
            {
                using (StreamReader responseReader = new StreamReader(webRequest.GetResponse().GetResponseStream()))
                    return responseReader.ReadToEnd();
            }
            catch
            {
                return String.Empty;
            }
        }
    }
}