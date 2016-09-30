using MakingCollaboration.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MakingCollaboration.Controllers
{
    public class LanguagesController : ApiController
    {
        // GET api/<controller>
        public string Get()
        {
            var repos = WebRequest("https://api.github.com/users/makingwaves/repos");
            var repositories = JsonConvert.DeserializeObject<List<Repository>>(repos);
            Dictionary<string, int> allLanguages = new Dictionary<string, int>();
            foreach (Repository repository in repositories)
            {
                var languages = Get(repository.full_name);
                var deserializedLanguages = JsonConvert.DeserializeObject<Dictionary<string, int>>(languages);
                foreach(var lan in deserializedLanguages)
                {
                    if (!allLanguages.ContainsKey(lan.Key))
                    {
                        allLanguages.Add(lan.Key, lan.Value);
                    }
                    else
                    {
                        int value;
                        allLanguages.TryGetValue(lan.Key, out value);
                        value += lan.Value;
                        allLanguages[lan.Key] = value;
                    }
                }
            }
            return JsonConvert.SerializeObject(allLanguages);
        }

        public string Get(string repoName)
        {
            var languages = WebRequest("https://api.github.com/repos/" + repoName + "/languages");
            return languages;
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