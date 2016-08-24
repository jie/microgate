import tornado.ioloop
import tornado.web
import sys
import time

class MainHandler(tornado.web.RequestHandler):
    def get(self, *args, **kwargs):
        self.write("Get Successful, %s" % str(time.time()))

    def post(self, *args, **kwargs):
        self.write("Post Successful, %s" % str(time.time()))



if __name__ == "__main__":
    port = sys.argv[1]
    print('listen port: %s' % port)
    application = tornado.web.Application([
        (r'/usercenter/(.+)$', MainHandler),
    ])
    application.listen(int(port))
    tornado.ioloop.IOLoop.current().start()
