import tornado.ioloop
import tornado.web
import sys
import time

class MainHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        print(self.request.body)
        print(self.request.full_url())
        self.write("Get Successful, %s" % str(time.time()))

    def post(self, *args, **kwargs):
        print(self.request.body)
        print(self.request.full_url())
        self.write("Post Successful, %s" % str(time.time()))

    def put(self, *args, **kwargs):
        print(dir(self.request))
        print(self.request.body)
        print(self.request.full_url())
        self.write("Put Successful, %s" % str(time.time()))

if __name__ == "__main__":
    port = sys.argv[1]
    print('listen port: %s' % port)
    application = tornado.web.Application([
        (r'/usercenter/(.+)$', MainHandler),
    ])
    application.listen(int(port))
    tornado.ioloop.IOLoop.current().start()
