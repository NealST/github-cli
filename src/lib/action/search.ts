import {request} from '../tools/request'
import { getToken, getUserName } from '../tools/verification'
import askquestion from '../tools/askQuestion';
import createTable from '../tools/tableShow';
import { info, success } from '../tools/output'
const acceptType = 'application/vnd.github.v3.text-match+json'

export const searchActions = {
  // search repositories
  searchRepos (options: any) {
    return request(`/search/repositories`, 'get', options.data, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      let dataItems = res.data.items
      if (dataItems && dataItems.length > 0) {
        let dataTable: any = createTable({
          head: ['name', 'owner', 'description', 'detailUrl(cmd+click)'],
          colWidths: [10, 16, 40, 60],
          wordWrap: true
        })
        dataItems.forEach((item: any) => {
          dataTable.push([item.name, item.owner.login, item.description || 'empty description', item.html_url])
        })
        console.log(dataTable.toString())
      } else {
        info('there is no repository match your search condition')
      }
    })
  },
  // search commits
  searchCommits (options: any) {
    return request(`/search/commits`, 'get', options.data, {
      headers: {
        'Accept': 'application/vnd.github.cloak-preview'
      }
    }).then((res: any) => {
      let dataItems = res.data.items
      if (dataItems && dataItems.length > 0) {
        let dataTable: any = createTable({
          head: ['sha', 'committer', 'commit message', 'detailUrl(cmd+click)'],
          colWidths: [10, 10, 40, 60],
          wordWrap: true
        })
        dataItems.forEach((item: any) => {
          dataTable.push([item.sha, item.commit.author.name, item.commit.message, item.html_url])
        })
        console.log(dataTable.toString())
      } else {
        info('there is no commit match your search condition')
      }
    })
  },
  // search issues
  searchIssues (options: any) {
    return request('/search/issues', 'get', options.data, {
      headers: {
        'Accept': acceptType
      }  
    }).then((res: any) => {
      let dataItems = res.data.items
      if (dataItems && dataItems.length > 0) {
        let dataTable: any = createTable({
          head: ['title', 'state', 'body', 'detailUrl(cmd+click)'],
          colWidths: [20, 10, 40, 60],
          wordWrap: true
        })
        dataItems.forEach((item: any) => {
          dataTable.push([item.title, item.state, item.body || 'empty description', item.html_url])
        })
        console.log(dataTable.toString())
      } else {
        info('there is no issue match your search condition')
      }
    })
  },
  // search users
  searchUsers (options: any) {
    return request('/search/users', 'get', options.data, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      let dataItems = res.data.items
      if (dataItems && dataItems.length > 0) {
        let dataTable: any = createTable({
          head: ['name', 'detailUrl(cmd+click)'],
          colWidths: [20, 60]
        })
        dataItems.forEach((item: any) => {
          dataTable.push([item.login, item.html_url])
        })
        console.log(dataTable.toString())
      } else {
        info('there is no user match your search condition')
      }
    })
  },
  // search code
  searchCode (options: any) {
    return request('/search/code', 'get', options.data, {
      headers: {
        'Accept': acceptType
      }
    }).then((res: any) => {
      let dataItems = res.data.items
      if (dataItems && dataItems.length > 0) {
        let dataTable: any = createTable({
          head: ['path', 'repos name', 'repos description', 'detailUrl(cmd+click)'],
          colWidths: [20, 20, 40, 60],
          wordWrap: true
        })
        dataItems.forEach((item: any) => {
          dataTable.push([item.path, item.repository.full_name, item.repository.description, item.html_url])
        })
        console.log(dataTable.toString())
      } else {
        info('there is no result match your search condition')
      }
    })
  }
}

function searchWithData (questionObject: any, fn: Function, keyword?: string) {
  askquestion([{
    type: 'checkbox',
    name: 'filters',
    message: 'you could select some filter conditions to search:',
    choices: Object.keys(questionObject)
  }], (answers: any) => {
    let questionArray = answers.filters.map((item: any) => {
      return questionObject[item]
    })
    askquestion(questionArray, (theanswers: any) => {
      let conditionStr = Object.keys(theanswers).map((item: any) => {
        return item === 'topic' ? theanswers.topic.split(' ').map((topicItem: string) => {
          return `topic:${topicItem}`
        }).join('+') : `${item}:${theanswers[item]}`
      }).join('+')
      fn({
        data: {
          q: keyword ? `${keyword}+${conditionStr}` : conditionStr
        }
      })
    })
  })
}

export const searchStrategy: {[key: string]: any} = {
  'r': function () {
    let questionObject: {[key: string]: any} = {
      'fork(filter whether forked repositories should be included)': {
        type: 'confirm',
        name: 'fork',
        message: 'please confirm whether forked repositories should be included:'
      },
      'forks(filter repositoties based on the number of forks)': {
        type: 'input',
        name: 'forks',
        message: 'please input the minimal number of forks to filter:'
      },
      'language(filter repositories based on the language they are written in)': {
        type: 'input',
        name: 'language',
        message: 'please input the languages of searched repositories:'
      },
      'user(limit search action to a specific user)': {
        type: 'input',
        name: 'user',
        message: 'please input the ownername of searched repositories:'
      },
      'size(Finds repositories that match a certain size)': {
        type: 'input',
        name: 'size',
        message: 'please input the minimal size of searched repositories(in kb):'
      },
      'stars(Searches repositories based on the number of stars)': {
        type: 'input',
        name: 'stars',
        message: 'please input the minimal number of stars of searched repositories:'
      },
      'topic(Filters repositories based on the specified topic)': {
        type: 'input',
        name: 'topic',
        message: 'input the topics of searched repositories(split with space):',
      }
    }
    searchWithData(questionObject, searchActions.searchRepos)
  },
  'c': function () {
    let questionObject: {[key: string]: any} = {
      'author(Matches commits authored by a user)': {
        type: 'input',
        name: 'author-name',
        message: 'please input the commit author name:'
      },
      'committer(Matches commits committed by a user)': {
        type: 'input',
        name: 'committer-name',
        message: 'please input the committer name:'
      },
      'merge(Matched commits whether be merged)': {
        type: 'confirm',
        name: 'merge',
        message: 'does you need filter merged commits'
      },
      'hash(Matches commits by hash)': {
        type: 'input',
        name: 'hash',
        message: 'please input the hash value:'
      },
      'repo( Limits searches to a specific repository)': {
        type: 'input',
        name: 'repo',
        message: 'please input the repository name:'
      }
    }
    searchWithData(questionObject, searchActions.searchCommits)
  },
  'i': function () {
    let questionObject: {[key: string]: any} = {
      'type(With this qualifier you can restrict the search to issues or pull request)': {
        type: 'list',
        name: 'type',
        message: 'please select a search type:',
        choices: ['issue', 'pr']
      },
      'author(Finds issues or pull requests created by a certain user)': {
        type: 'input',
        name: 'author',
        message: 'please input the author name to search:'
      },
      'assignee(Finds issues or pull requests that are assigned to a certain user)': {
        type: 'input',
        name: 'assignee',
        message: 'please input the assignee name to search:'
      },
      'mentions(Finds issues or pull requests that mention a certain user)': {
        type: 'input',
        name: 'mentions',
        message: 'please input the username mentioned to search:'
      },
      'commenter(Finds issues or pull requests that a certain user commented on)': {
        type: 'input',
        name: 'commenter',
        message: 'please input a commenter name to search:'
      },
      'state(Filter issues or pull requests based on whether they are open or closed)': {
        type: 'list',
        name: 'state',
        message: 'please select a state to search:',
        choices: ['open', 'closed']
      },
      'language(Searches for issues or pull requests within repositories that match a certain language)': {
        type: 'input',
        name: 'language',
        message: 'please input the language that match the repository to search for issues:'
      }
    }
    searchWithData(questionObject, searchActions.searchIssues)
  },
  'u': function () {
    let questionObject: {[key: string]: any} = {
      'repos(Filters users based on the number of repositories they have)': {
        type: 'input',
        name: 'repos',
        message: 'please input the minimal number of repositories to search:'
      },
      'language(Search for users that have repositories that match a certain language)': {
        type: 'input',
        name: 'language',
        message: 'please input the language that match the repositories of the searched users:'
      },
      'followers(Filter users based on the number of followers they have)': {
        type: 'input',
        name: 'followers',
        message: 'please input the minimal number of followers to searched users have:'
      }
    }
    searchWithData(questionObject, searchActions.searchUsers)
  }
}